# Collapsable-Toolbar
A userscript that creates a toolbar to place buttons from userscripts.

# Installation
Requires a browser extension that enables userscripts to install this userscript. I personally use Tampermonkey but other extensions should work as well.  
Chrome:  
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en  
Firefox:  
https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/  
To install this script specifically, just the <code>user.js</code> file needs to downloaded.

### Adding to the toolbar
[HTML Code](https://github.com/erickRecai/Collapsable-Toolbar/blob/Collapsable-Toolbar/examples%20images/4-html-code.png)
The designated element to add more things is a <code>div</code> with the id <code>ctb-buttons</code>.

### How it works
Here is how it would look normally. It is generated to appear at the lower right of pages where it is enabled.
[Initial Appearance](https://github.com/erickRecai/Collapsable-Toolbar/blob/Collapsable-Toolbar/examples%20images/1-initial.png)
Mousing over it makes it fully visible.
[Mousing Over](https://github.com/erickRecai/Collapsable-Toolbar/blob/Collapsable-Toolbar/examples%20images/2-mouse-over.png)
1. The <code>Hide</code> button: minimizes the toolbar to a small <code>Open</code> button which would reopen the toolbar again.
2. The <code>x</code> button: deletes the entire toolbar for the current page. Reloading the page returns the toolbar.

Here is the toolbar minimized.
[Mousing Over](https://github.com/erickRecai/Collapsable-Toolbar/blob/Collapsable-Toolbar/examples%20images/3-hidden.png)

