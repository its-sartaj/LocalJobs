import os
import re
import glob

def optimize_html_files():
    out_dir = os.path.abspath("out")
    if not os.path.exists(out_dir):
        print("out directory not found!")
        return

    # Find css files
    css_files = glob.glob(os.path.join(out_dir, "_next", "static", "css", "*.css"))
    css_content = ""
    css_rel_path = ""
    if css_files:
        css_file = css_files[0]
        with open(css_file, "r", encoding="utf-8") as f:
            css_content = f.read()
        css_rel_path = "/" + os.path.relpath(css_file, out_dir).replace("\\", "/")
        print(f"Loaded CSS: {css_rel_path} ({len(css_content)} bytes)")

    html_files = glob.glob(os.path.join(out_dir, "**", "*.html"), recursive=True)
    print(f"Found {len(html_files)} HTML files to optimize.")

    for html_path in html_files:
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_len = len(content)

        # 1. Ensure fetchPriority is lowercase fetchpriority throughout
        content = content.replace('fetchPriority="high"', 'fetchpriority="high"')
        content = content.replace('fetchPriority="low"', 'fetchpriority="low"')

        # 2. Extract existing mountain preloads if present so we can hoist them
        mobile_preload = '<link rel="preload" as="image" href="/images/mountain_bg_mobile.webp" media="(max-width: 768px)" fetchpriority="high" type="image/webp"/>'
        desktop_preload = '<link rel="preload" as="image" href="/images/mountain_bg.webp" media="(min-width: 769px)" fetchpriority="high" type="image/webp"/>'

        # Remove any existing occurrences of injected tags to ensure idempotency
        content = re.sub(r'<style id="__next_css">.*?</style>', '', content, flags=re.DOTALL)
        content = re.sub(r'<link rel="preload" as="image" href="/images/mountain_bg_mobile\.webp"[^>]*>', '', content)
        content = re.sub(r'<link rel="preload" as="image" href="/images/mountain_bg\.webp"[^>]*>', '', content)
        content = re.sub(r'<noscript><link rel="stylesheet"[^>]+></noscript>', '', content)
        content = re.sub(r' media="print" onload="this\.media=\'all\'"', '', content)

        # Hoist preloads and critical CSS right after viewport tag
        head_insertion = mobile_preload + desktop_preload
        if css_content:
            head_insertion += f'<style id="__next_css">{css_content}</style>'

        # Insert immediately after viewport tag so viewport stays in the first 100 bytes of <head>
        viewport_match = re.search(r'<meta name="viewport"[^>]*>', content)
        if viewport_match:
            vp_tag = viewport_match.group(0)
            content = content.replace(vp_tag, vp_tag + head_insertion, 1)
        elif '<meta charSet="utf-8"/>' in content:
            content = content.replace('<meta charSet="utf-8"/>', '<meta charSet="utf-8"/>' + head_insertion, 1)
        elif '<meta charset="utf-8"/>' in content:
            content = content.replace('<meta charset="utf-8"/>', '<meta charset="utf-8"/>' + head_insertion, 1)
        elif '<head>' in content:
            content = content.replace('<head>', '<head>' + head_insertion, 1)

        # 3. Make stylesheet link non-render blocking (media="print" onload="this.media='all'")
        # while keeping data-precedence="next" so Next.js hydration doesn't conflict
        content = re.sub(
            r'<link rel="stylesheet" href="(/_next/static/css/[^"]+)" data-precedence="next"/>',
            r'''<link rel="stylesheet" href="\1" media="print" onload="this.media='all'" data-precedence="next"/><noscript><link rel="stylesheet" href="\1"/></noscript>''',
            content
        )

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Optimized {os.path.relpath(html_path, out_dir)} ({original_len} -> {len(content)} bytes)")

    # Ensure CNAME and empty .nojekyll in out/
    with open(os.path.join(out_dir, "CNAME"), "w", encoding="utf-8") as f:
        f.write("localjobs.work.gd\n")
    with open(os.path.join(out_dir, ".nojekyll"), "wb") as f:
        pass

    print("Post-build optimization complete!")

if __name__ == "__main__":
    optimize_html_files()
