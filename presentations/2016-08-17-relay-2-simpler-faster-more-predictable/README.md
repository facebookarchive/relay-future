# Relay 2: simpler, faster, more predictable

> Relay is becoming faster, simpler, and more predictable. This talk will cover Relay's plans for the future of client-side data management.

Presentation given at the [Silicon Valley ReactJS Meetup](https://www.meetup.com/Silicon-Valley-ReactJS-Meetup/events/232236845/) on 17 August 2016.

Slides [available on Speaker Deck](https://speakerdeck.com/wincent/relay-2-simpler-faster-more-predictable) (lower-quality, based on rendered PDF) and also [on GitHub](https://wincent.github.io/relay-2-simpler-faster-more-predictable/#2) (higher-quality, HTML-based, built for current Chrome but may work on other browsers; also, see the [presenter view](https://wincent.github.io/relay-2-simpler-faster-more-predictable/?presenter#2)).

The slides as presented use Freight Sans Pro as the main font. This is a non-free commercially available font; the slides fall back to a generic "sans-serif" if Freight Sans Pro is not installed on your system.

## About the slide "framework"

Slide content is at "content/index.html". A double-clickable `slides.url` shortcut file is supplied as a convenience.

### Features

Plain-text snippets (source code, ASCII-art diagrams) in the "content" directory are included via an `iframe` hack, but due to the same-origin policy, the hack won't work with resources accessed using `file://` URLs. As such, we need serve the presentation locally using the included `run.sh` script.

### Presenter mode

To use presenter mode, open another window with the query string parameter "?presenter". A `presenter.url` shortcut file is supplied as a convenience for this too.

In order for this to work with Chrome in fullscreen mode (which you will want on at least the audience-facing display), you need to have the "Displays have separate spaces" checkbox checked in the Mission Control pane in the System Preferences application.

### Printing to PDF

1. Fullscreen the presentation.
2. Take a screenshot of each slide with Shift-Command-3; note that you might want to comment out the `transition` rule in the CSS to make switching between slides faster. Also, it's best to do this without an external display connected, so that you don't waste any time producing extraneous screenshots of that display.
3. Drag all the screenshots into the "screenshots" folder.
4. Run the `rename.rb` script to rename/renumber the images.
5. Drag all the screenshots into the Preview.app.
6. Set up a custom paper size called "Screen" with dimensions 8.18 wide by 13.09 high, and 0 non-printable space on each side; this works for the current 15" MacBook Pro, which has a 2880 x 1800 display with a 220 ppi pixel density.
7. Change the print orientation to landscape.
8. Print to PDF.
9. Enjoy your multi-hundred-megabyte PDF.
10. There is no step 10! (Except, perhaps, for uploading to Speaker Deck.)

### Design rationale

#### Goals

* Don't want to suffer through using Keynote (adding and updating syntax-highlighted code samples is a pain, all the clicking and dragging is a pain).
* Want simple control over appearance via CSS.
* Want ability to meaningfully and usefully version-control the content, so need plain-text formats.
* Don't want to choose from a zillion possible frameworks then learn and customize one; just want to write a single, vanilla HTML file with some very simple styles at the top and a bit of JS logic at the bottom.
* Want ability to embed snippets from external files (for easy updates of source code samples).
* Want basic presenter notes (embedded HTML comments become notes) and timer functionality.
* Want smart resizing of text and graphics for maximum readability (`pre` blocks get stretched to fill space with JS; SVG images get stretched via flexbox).
* Want easily reused basis for future presentations.
* Want ability to control via keyboard and USB presentation remote.
* Want no "build" process; everything should be vanilla JS that the browser supports, and content should just be simple static files.
* Want syntax highlighting via highlight.js.

#### Non-goals

* Support for any browser other than the one I'm presenting on (current Chrome).
* Support for fancy transitions or multi-step slide build-outs (if you want build out, just make another slide).
* Preview of next slide in presenter mode (by convention, I include a reminder of what's coming next with a final presenter note prefaced with an ellipsis).
* Easy-printing to PDF: while this would be nice, the manual method described above is not too onerous and produces good enough results.
* Live resizing of `pre` blocks in response to window resize events (presentation will be full-screen anyway).
* Manual control over timer (just refresh the page if you want to restart the timer).
* Beautiful CSS and JS internals.
