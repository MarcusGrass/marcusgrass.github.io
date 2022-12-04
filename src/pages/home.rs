const RAW_HTML: &str = "<h1>About</h1>
<p>This site is a place where I intend to store things I've learned so that I won't forget it.</p>
<h2>This page</h2>
<p>There's not supposed to be a web 1.0 vibe to it, but I'm horrible at front-end styling so here we are.<br />
The site is constructed in <a href=\"https://github.com/rust-lang/rust\">Rust</a> with <a href=\"https://yew.rs/\">Yew</a>,
as with all things in my free time I make things more complicated than they need to be.<br />
Except for the actual content, I pulled in a Markdown renderer so that I don't have to do so much web-work.<br />
Additionally, the markdown styling is ripped from <a href=\"https://github.com/sindresorhus/github-markdown-css\">this project</a>,
it's GitHub's markdown CSS, I don't want to stray too far out of my comfort zone...</p>
<p>All page content except for some glue is just rendered markdown contained
in <a href=\"https://github.com/MarcusGrass/marcusgrass.github.io\">the repo</a>.</p>
<h2>Content</h2>
<p>See the menu bar at the top left to navigate, if I end up writing a lot of stuff here I'm going to have to look into
better navigation and search.</p>
<h2>License</h2>
<p>The license for this pages code can be found in the
repo <a href=\"https://github.com/MarcusGrass/marcusgrass.github.io/blob/main/LICENSE\">here</a>.<br />
The license for the styling is under that
repo <a href=\"https://github.com/sindresorhus/github-markdown-css/blob/main/license\">here</a></p>
";

pub fn page_html() -> yew::Html {
	let div = gloo_utils::document().create_element("div").unwrap();
	div.set_inner_html(RAW_HTML);
	div.set_class_name("markdown-body");
	yew::Html::VRef(div.into())
}

