import * as dat from 'dat.gui';

(function() {
    const folders = { text: null, colors: null };

    const TYPES = {
        text: (gui, name, value) => {
            if (!folders.text) {
                folders.text = gui.addFolder('Other');
            }
            const controller = folders.text.add(value, name);
            controller.onChange((v) => document.documentElement.style.setProperty(name, v));
        },

        color: (gui, name, value) => {
            if (!folders.colors) {
                folders.colors = gui.addFolder('Colors');
            }

            const controller = folders.colors.addColor(value, name);
            controller.onChange((v) => document.documentElement.style.setProperty(name, v));
        },
    };

    /**
     * Get a list of all css rules which and filter for css vars
     * @param {CSSRule[]} declarations
     * @return {{[key: string]: string}}
     */
    const getAllRules = (declarations) => {
        return declarations
            .filter(d => d.selectorText === ':root')
            .reduce((acc, declaration) => {
                const allVar = declaration.style.cssText.split(';');
                for (var i = 0; i < allVar.length; i++) {
                    const [key, value] = allVar[i].split(':').map(s => s.trim());
                    if (key !== '' && key.startsWith('--') && !value.includes('var(')) {
                        acc[key] = value;
                    }
                }
                return acc;
            }, {});
    };

    /**
     * Transform a iteratable object into an array
     * @param {object} sheets
     * @return {[]}
     */
    const toArray = (sheets) => {
        const list = [];
        for (let i = 0; i < sheets.length; i++) {
            list.push(sheets[i]);
        }
        return list;
    };

    /**
     * Check if string is a valid color value
     * @param {string} strColor
     * @return {boolean}
     */
    const isColor = (strColor) => {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    };

    /**
     *
     * @param {Element | undefined}container
     * @param {StyleSheet[] | StyleSheetList}stylesheets
     */
    function cssVarUi(container, stylesheets = document.styleSheets) {
        const gui = new dat.GUI();

        const result = toArray(stylesheets)
            .reduce((acc, stylesheet) => {
                try {
                    return {
                        ...acc,
                        ...getAllRules(toArray(stylesheet.cssRules)),
                    };
                } catch (e) {
                    return acc;
                }
            }, {});

        Object.entries(result)
            .forEach(([key]) => {
                if (isColor(result[key])) {
                    TYPES.color(gui, key, result);
                    return;
                }
                TYPES.text(gui, key, result);
            });

        if (container) {
            container.appendChild(gui.domElement);
        }
    };

    cssVarUi();
})()
