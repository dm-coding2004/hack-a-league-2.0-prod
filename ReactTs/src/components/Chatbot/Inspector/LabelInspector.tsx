import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import { dia } from '@clientio/rappid';

import { useBaseInspector } from 'src/components/Chatbot/Inspector/useBaseInspector';
import Input from 'src/components/Chatbot/Input/Input';

interface Props {
    cell: dia.Cell;
}

const cellProps = {
    label: ['attrs', 'label', 'text']
};

const LabelInspector = (props: Props): ReactElement => {

    const { cell } = props;

    const [label, setLabel] = useState<string>('');

    const assignFormFields = useCallback((): void => {
        setLabel(cell.prop(cellProps.label));
    }, [cell]);

    const changeCellProp = useBaseInspector({ cell, assignFormFields });

    return (
        <>
            <h1>Component</h1>
            <button style={{padding: 100}}>Create</button>
            <Input id="label"
                   type="text"
                   placeholder="Enter label"
                   value={label}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => changeCellProp(cellProps.label, e.target.value)}
            />
        </>
    );
};

export default LabelInspector;
