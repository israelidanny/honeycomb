export default function DOMFactory({ Point, isDom, Element } = {}) {
    /**
     * @function Views.DOM
     *
     * @description
     * Factory function for creating a DOM view object. This object can be used to render an array of hexes or a grid instance.
     *
     * @param {Object} options                  An options object.
     * @param {Node} options.container          A DOM node to render hexes in.
     * @param {Point} [options.origin=Point()]  A point where the first hex (i.e. `Hex(0, 0, 0)`) can be rendered.
     * @param {Function} [options.template]     Template function that should return a (visual) representation of the hex. It gets passed the current hex when called.
     *
     * @returns {Object}                        A DOM View instance.
     */
    return function DOM({
        grid,
        container,
        origin,
        template = hex => hex
    } = {}) {
        if (!isDom(container)) {
            throw new Error(`Container is not a valid dom node: ${container}.`)
        }

        return {
            grid,
            container,
            origin: Point(origin),
            template,

            /**
             * @method Views.DOM#render
             *
             * @description
             * Renders the passed {@link Grid|grid} instance in the container. The container is completely covered with hexes.
             *
             * @todo validate `grid`
             *
             * @param   {Object} grid   A grid instance.
             *
             * @returns {Object}        The DOM View object, for chaining.
             */
            renderGrid() {
                const Hex = grid.Hex
                // increase the size of the hex rectangle to guarantee it covers the container
                const width = Math.round(this.container.offsetWidth / grid.colSize()) + 3
                const height = Math.round(this.container.offsetHeight / grid.rowSize()) + 3
                const start = Hex.subtract(grid.pointToHex(this.origin.invert()), Hex(1))

                return this.renderHexes(grid.rectangle(width, height, start))
            },

            /**
             * @method Views.DOM#renderHexes
             *
             * @description
             * Renders the passed hexes in the container.
             *
             * @param   {Hex[]} hexes   An array of hexes to render.
             *
             * @returns {Object}        The DOM View object, for chaining.
             */
            renderHexes(hexes) {
                const elements = hexes.reduce((fragment, hex) => {
                    Element(hex, this.template)
                        .position(this.origin)
                        .appendTo(fragment)
                    return fragment
                }, document.createDocumentFragment())

                this.container.appendChild(elements)

                return this
            }
        }
    }
}