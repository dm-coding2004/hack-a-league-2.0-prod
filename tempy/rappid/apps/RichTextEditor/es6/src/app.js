import { dia, ui, shapes, highlighters } from '@clientio/rappid';
import { DEFAULT_TEXT_ATTRIBUTES } from './config';
import { RichTextToolbar } from './rich-text-toolbar';
import { TextNode, textNodes } from './shapes';

export const init = () => {
    
    const canvasEl = document.getElementById('canvas');
    const toolbarEl = document.getElementById('toolbar');
    const shapeNamespace = Object.assign(Object.assign({}, shapes), { TextNode });
    
    const graph = new dia.Graph({}, {
        cellNamespace: shapeNamespace
    });
    
    const paper = new dia.Paper({
        model: graph,
        width: 1000,
        height: 600,
        gridSize: 10,
        interactive: true,
        async: true,
        sorting: dia.Paper.sorting.APPROX,
        background: { color: '#F3F7F6' },
        clickThreshold: 10,
        cellViewNamespace: shapeNamespace
    });
    
    const scroller = new ui.PaperScroller({
        paper,
        autoResizePaper: true,
        cursor: 'grab',
        baseWidth: 100,
        baseHeight: 100,
        contentOptions: {
            allowNewOrigin: 'negative',
            useModelGeometry: true,
            padding: 50
        }
    });
    
    canvasEl.appendChild(scroller.el);
    scroller.render().center();
    
    const toolbar = new RichTextToolbar({
        el: toolbarEl,
        defaultAttributes: DEFAULT_TEXT_ATTRIBUTES,
        setAttributes: (attrs) => {
            
            const model = getSelected();
            if (!model)
                return;
            const text = model.prop(TextNode.LABEL_PATH);
            const annotations = model.prop(TextNode.ANNOTATION_PATH);
            const { ed } = ui.TextEditor;
            
            // If some text is selected and the user changes an attribute via the toolbar,
            // apply this change on the selected text.
            // Otherwise, set the current annotation so that the very next insert
            // will use it for the inserted text.
            let start, end;
            if (ed) {
                const range = ed.getSelectionRange();
                start = range.start;
                end = range.end;
            }
            else {
                start = 0;
                end = text.length;
            }
            
            let newAnnotation;
            if (start !== end) {
                newAnnotation = {
                    start: ui.TextEditor.isLineStart(text, start) ? start - 1 : start,
                    end,
                    attrs
                };
            }
            else if (ui.TextEditor.isEmptyLine(text, start)) {
                newAnnotation = {
                    start: start - 1,
                    end: start,
                    attrs
                };
            }
            
            if (newAnnotation) {
                const newAnnotations = ui.TextEditor.normalizeAnnotations([...annotations, newAnnotation]);
                model.prop(TextNode.ANNOTATION_PATH, newAnnotations, { rewrite: true, async: false });
                ed === null || ed === void 0 ? void 0 : ed.setAnnotations(newAnnotations);
                ed === null || ed === void 0 ? void 0 : ed.select(start, end);
            }
            else {
                ed === null || ed === void 0 ? void 0 : ed.setCurrentAnnotation(attrs);
                // Reflect the visual change of the attrs.
                // e.g. increase the size of the caret when the font-size is changed.
                ed === null || ed === void 0 ? void 0 : ed.updateCaret();
            }
        }
    });
    
    toolbar.disable();
    
    ui.TextEditor.on('caret:change select:change', () => {
        
        const ed = ui.TextEditor.ed;
        // Update the widgets in the toolbar based on the text annotation under the cursor
        // or in the current selection if there is one.
        const annotations = ed.getAnnotations();
        let { start, end } = ed.getSelectionRange();
        if (start === end) {
            start = end = start - 1;
        }
        
        const attrs = ui.TextEditor.getCombinedAnnotationAttrsBetweenIndexes([{ start: -Infinity, end: Infinity, attrs: DEFAULT_TEXT_ATTRIBUTES }, ...annotations], start, end);
        
        toolbar.updateInputsDebounced(attrs);
    });
    
    graph.addCells(textNodes, { async: false });
    
    // Resize the elements based on the text inside them
    
    TextNode.setupAutoSizeAdjustment(paper);
    
    // Selection
    
    const SELECTED = 'selected';
    
    function unselectAll() {
        graph.getElements().filter(el => el.get(SELECTED)).forEach(el => {
            el.set({
                [SELECTED]: false,
                z: 1
            });
        });
        toolbar.disable();
    }
    
    function selectOne(el) {
        unselectAll();
        el.set({
            [SELECTED]: true,
            z: 2
        });
        toolbar.enable();
    }
    
    function getSelected() {
        var _a;
        return (_a = graph.getElements().find(el => el.get(SELECTED))) !== null && _a !== void 0 ? _a : null;
    }
    
    function isSelected(el) {
        return Boolean(el.get(SELECTED));
    }
    
    graph.on('change:selected', (el) => {
        const highlighterId = 'selection-mask';
        const selected = isSelected(el);
        const elView = el.findView(paper);
        if (selected) {
            highlighters.stroke.add(elView, 'body', highlighterId, {
                layer: dia.Paper.Layers.FRONT,
                useFirstSubpath: true,
                padding: 10,
                attrs: {
                    'stroke': '#0156D2',
                    'stroke-width': 3,
                    'stroke-linejoin': 'round'
                }
            });
        }
        else {
            highlighters.stroke.remove(elView, highlighterId);
        }
    });
    
    // Register events
    
    paper.on('paper:pinch', (evt, ox, oy, scale) => {
        evt.preventDefault();
        scroller.zoom(scale - 1, { min: 0.2, max: 5, ox, oy });
    });
    
    paper.on('paper:pan', (evt, tx, ty) => {
        evt.preventDefault();
        scroller.el.scrollLeft += tx;
        scroller.el.scrollTop += ty;
    });
    
    paper.on('blank:pointerdown', (evt) => {
        unselectAll();
        scroller.startPanning(evt);
    });
    
    paper.on('scale', () => {
        var _a;
        (_a = ui.TextEditor.ed) === null || _a === void 0 ? void 0 : _a.updateCaret();
    });
    
    paper.on('element:pointerclick', (elementView, evt) => {
        const { model } = elementView;
        if (ui.TextEditor.ed)
            return;
        const { detail } = evt;
        if (detail === 1) {
            if (!isSelected(model)) {
                // The first click selects the element.
                const text = model.prop(TextNode.LABEL_PATH);
                const annotations = [
                    { start: 0, end: text.length, attrs: DEFAULT_TEXT_ATTRIBUTES },
                    ...model.prop(TextNode.ANNOTATION_PATH)
                ];
                const attrs = ui.TextEditor.getCombinedAnnotationAttrsBetweenIndexes(annotations, 0, text.length);
                toolbar.updateInputs(attrs);
                selectOne(model);
                return;
            }
        }
        // If the element is selected, the first click opens the text editor
        // The second click opens the text editor and selects the word under the pointer.
        const [labelNode] = elementView.findBySelector('label');
        ui.TextEditor.edit(labelNode, {
            cellView: elementView,
            textProperty: TextNode.LABEL_PATH,
            annotationsProperty: TextNode.ANNOTATION_PATH,
            onOutsidePointerdown: function (pointerEvt, editor) {
                const target = pointerEvt.target;
                // If the user clicks not on the text but on the background (the cell view)
                // we set the cursor to the closest line to the click position
                if (elementView.el.contains(target)) {
                    pointerEvt.stopPropagation();
                    editor.startSelecting();
                    const charNum = editor.getCharNumFromEvent(pointerEvt);
                    editor.select(charNum);
                    return;
                }
                // If the user clicks on the toolbar we do not want to
                // cancel the current text selection
                // i.e. preventDefault() must be called.
                if (toolbar.el.contains(target)) {
                    // There is no INPUT / TEXTAREA in our toolbar. We can safely prevent the default.
                    pointerEvt.preventDefault();
                    return;
                }
                
                // If the user clicks outside the text editor, we'll close the editor.
                pointerEvt.stopPropagation();
                ui.TextEditor.close();
            },
            onKeydown: (keyboardEvt) => {
                switch (keyboardEvt.code) {
                    case 'Escape': {
                        keyboardEvt.stopPropagation();
                        ui.TextEditor.close();
                        unselectAll();
                        break;
                    }
                    case 'Tab': {
                        // Disable the Tab key while the text editor is open
                        keyboardEvt.preventDefault();
                        break;
                    }
                }
            },
        });
        
        const { ed } = ui.TextEditor;
        const charNumFromEvent = ed.getCharNumFromEvent(evt);
        if (detail === 1) {
            // The first click on already selected element sets the cursor under the pointer
            ed.select(charNumFromEvent);
        }
        else {
            // The second click on already selected element selects a word under the pointer
            const [selectionStart, selectionEnd] = ed.getWordBoundary(charNumFromEvent);
            ed.select(selectionStart, selectionEnd);
        }
    });
};
