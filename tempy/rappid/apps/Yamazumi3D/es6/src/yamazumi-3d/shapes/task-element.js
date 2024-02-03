import { RectPrism, RectPrismView } from './rect-prism';

const TYPE = 'yamazumi.TaskElement';

export class TaskElement extends RectPrism {
    constructor(attributes, options) {
        super(attributes, options);
        
        this.setTaskHeight();
        
        this.on('change:duration', () => {
            this.setTaskHeight();
        });
    }
    
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { type: TYPE });
    }
    
    setTaskHeight() {
        const height = this.get('duration') * this.get('durationHeight');
        
        this.prop('size/height', height);
    }
}

export class TaskElementView extends RectPrismView {
    constructor() {
        super(...arguments);
        this.animation = {
            easing: 'ease-in',
            fill: 'forwards',
            duration: 200
        };
    }
    
    updateTransformation() {
        
        const { el, model } = this;
        const { x, y } = model.get('position');
        const transform = `translate(${x}px, ${y}px)`;
        const keyframes = { transform: [transform] };
        let move;
        if (this.move) {
            move = this.move;
            move.effect.setKeyframes(keyframes);
            move.currentTime = 0;
        }
        else {
            move = el.animate(keyframes, this.animation);
            move.onfinish = () => move.commitStyles();
            this.move = move;
        }
        if (model.get('animation')) {
            move.play();
        }
        else {
            move.finish();
        }
    }
}
