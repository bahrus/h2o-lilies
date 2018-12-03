# h2o-lilies

h2o-lilies is pronounced "water lilies".  h2o stands for "HTML to Object" and li refers to the li html element, and is a non-visual custom element.

h2o-lilies generates a nested object from a previous element, which is assumed to be a (recursive) list based on the list element (li).

h2o-lilies takes the philosophical stance that there is honor in providing [highly specialized, mundane](https://www.alibaba.com/product-detail/Valentine-s-Day-Preserved-Eternal-Flower_60815511471.html?spm=a2700.7724857.normalList.38.3840247c8V1VTu) [products](https://www.amazon.com/Shoelace-Aglet-Bullet-Metal-replacement/dp/B01AAD8ROW) that are useless by themselves, or [esoteric, limited services](https://www.deseretnews.com/top/735/21/Fish-sampler-Worm-farmer-and-29-other-odd-jobs-to-earn-more-money.html).


## The mission

We may want the server to render an initial (or complete, with the bulk hidden, perhaps?) list of items that provides a fast, rudimentary, SEO-friendly view of something complex, before an expensive renderer (tree, chart, or grid, etc) JS library is downloaded, that wants to generate its fancy view based on a Plain Old JavaScript Object.

Another scenario where this web component is useful is in helping bring the data contained in light DOM children into a more verbose HTML structure contained within the ShadowDOM of a web component. This scenario is illustrated below, based on [CSS-Only Nested Dropdown Navigation (ARIA)](https://codepen.io/gabriellewee/pen/oWyObX) found on code-pen:



h2o-lilies doesn't hide or remove the DOM element it extracts data from. The reason is that the fancy renderer that needs the data may not be ready yet.  So the responsibility to hide the original (light) DOM nodes is left to other components.  As we said, h2o-lilies is quite specialized.