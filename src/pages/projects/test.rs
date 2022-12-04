const RAW_HTML: &str = "<h1>Here's a test write-up</h1>
<p>I always test in prod, please hire me.</p>
<pre><code class=\"language-rust\">fn main() {
    panic!(&quot;I wish this was highlighted, but it's been painful \\
    getting that to work without exploding the site's size...&quot;);
}
</code></pre>
";

pub fn page_html() -> yew::Html {
	let div = gloo_utils::document().create_element("div").unwrap();
	div.set_inner_html(RAW_HTML);
	div.set_class_name("markdown-body");
	yew::Html::VRef(div.into())
}

