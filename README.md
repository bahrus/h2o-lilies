# h2o-lilies


<a href="https://nodei.co/npm/h2o-lilies/"><img src="https://nodei.co/npm/h2o-lilies.png"></a>

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/h2o-lilies@0.0.8/dist/h2o-lilies.iife.min.js?compression=gzip">

h2o-lilies is pronounced "water lilies".  It is a non-visual custom element.  "h2o" stands for "HTML to Object" and "li" refers to the li html element.

h2o-lilies generates a nested object from a previous element, which is assumed to be a (recursive) list based on the list element (li).

h2o-lilies takes the philosophical stance that there is honor in providing [highly specialized, mundane](https://www.alibaba.com/product-detail/Valentine-s-Day-Preserved-Eternal-Flower_60815511471.html?spm=a2700.7724857.normalList.38.3840247c8V1VTu) [products](https://www.amazon.com/Shoelace-Aglet-Bullet-Metal-replacement/dp/B01AAD8ROW)  or [esoteric, limited services](https://www.deseretnews.com/top/735/21/Fish-sampler-Worm-farmer-and-29-other-odd-jobs-to-earn-more-money.html) that are useless by themselves.


## The mission

We may want the server to render an initial list of items in format that is fast and SEO-friendly.  I.e. just send HTML to the browser.   If the content is particularly large, perhaps only a portion can be displayed, the rest hidden via styling.  But the total tree(displayed and hidden) has embedded in it all the needed data for a richer view. Once the necessary dependencies needed to generate this rich view are downloaded, containing some expensive renderer (tree, chart, or grid, etc), we can pass the Plain Old JavaScript Object (POJO) to the fancy renderer.

Another scenario where this web component may be useful is in helping bringing the data contained in light DOM children into a more verbose HTML structure contained within the ShadowDOM of a web component. This scenario is illustrated below, based on [CSS-Only Nested Dropdown Navigation (ARIA)](https://codepen.io/gabriellewee/pen/oWyObX) found on code-pen:


h2o-lilies doesn't hide or remove the DOM element it extracts the data from. The reason is that the fancy renderer that needs the data may not be ready yet.  So the responsibility to hide the original (light) DOM nodes is left to other components.  As we said, h2o-lilies is quite specialized.

To customize how the POJO is generated, extend this web component and override / extend the [initTransform method](https://github.com/bahrus/h2o-lilies/blob/master/h2o-lilies.ts#L6)