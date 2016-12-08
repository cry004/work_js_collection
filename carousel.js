/**
 * Carousel action module
 *
 * Modulared with ES6 by Yoshiaki Sugimoto.
 * Original logic implemented by Barbie, thanks :)
 * This is added line.
 *
 * @class Carousel
 */
class Carousel {

    static init(scene) {
        scene && new Carousel(scene);
    }

    constructor(scene) {
        this.box      = scene.querySelector(".js-CarouselBox");
        this.content  = scene.querySelector(".js-CarouselContent");
        this.next     = scene.querySelector(".js-CarouselNext");
        this.prev     = scene.querySelector(".js-CarouselPrev");

        this.indexNow    = -3;
        this.imageWidth  = 0;
        this.val         = 0;
        this.isAnimate   = false;
        this.imageLength = this.box.children.length;
        //this.imageNow    = -this.imageLength;
        this.timer       = null;

        const repeat     = 2;
        const totalNodes = this.box.children;
        for ( let i = 0; i < repeat; i++ ) {
            for ( let j = 0; j < this.imageLength; j++ ) {
                this.box.appendChild(totalNodes[j].cloneNode(true));
            }
        }

        this.setTransition(this.box, this.indexNow * this.content.offsetWidth);

        /* Listen for a transition! */
        const transition = this.whichTransitionEvent();
        transition && this.box.addEventListener(transition, () => this.check());
        /* The "whichTransitionEvent" can be swapped for "animation" instead of "transition" texts, as can the usage :) */

        this.next.addEventListener("click", () => this.changeImage(-1));
        this.prev.addEventListener("click", () => this.changeImage(1));

        window.addEventListener("resize", () => {
            this.imageWidth = this.content.offsetWidth;
            this.setTranslate(this.box, this.indexNow * this.imageWidth);
        });

        this.autoSlide();
    }

    autoSlide() {
        this.timer = setTimeout(() => {
            this.changeImage(-1);
        }, 6000);
    }

    changeImage(val) {
        if ( this.isAnimate === true ) {
            return;
        }

        try {
            clearTimeout(this.timer);
        } catch ( e ) {}

        this.val        = val;
        this.imageWidth = this.content.offsetWidth;
        this.indexNow  += val;
        this.isAnimate  = true;

        this.setTransition(this.box, "");
        this.setTranslate(this.box, this.indexNow * this.imageWidth);
        this.autoSlide();
    }

    check() {
        if ( this.val > 0 ) { // pre
            if ( this.indexNow > -3 ) {
                this.indexNow = this.imageLength * - 1 - 2;
                this.box.style.transition = "";
                this.setTransition(this.box, "inherit");
                this.setTranslate(this.box, this.indexNow * this.imageWidth);
            }
        } else { // next
            if ( this.indexNow < this.imageLength * -2 ) {
                this.indexNow = this.imageLength * -1 - 1;
                this.setTransition(this.box, "inherit");
                this.setTranslate(this.box, this.indexNow * this.imageWidth);
            }
        }
        this.isAnimate = false;
    }

    setTransition(element, value) {
        element.style.transition       = value;
        element.style.WebkitTransition = value;
        element.style.MozTransition    = value;
        element.style.MsTransition     = value;
        element.style.OTransition      = value;
    }

    setTranslate(element, value) {
        const translate = "translateX(" + value + "px)";

        element.style.transform       = translate;
        element.style.WebkitTransform = translate;
        element.style.MozTransform    = translate;
        element.style.MsTransform     = translate;
        element.style.OTransform      = translate;
    }

    whichTransitionEvent() {
        const transitions = {
            "transition":       "transitionend",
            "OTransition":      "oTransitionEnd",
            "MozTranstion":     "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        };

        let transition = "";
        Object.keys(transitions).forEach((t) => {
            if ( this.box.style[t] !== void 0 ) {
                transition = transitions[t];
            }
        });

        return transition;
    }
}

(() => {
    Carousel.init(document.querySelector(".js-Carousel"));
})();
