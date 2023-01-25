
import React from 'react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import { Datepicker} from '@mobiscroll/react';

export function FriendsPage() {
    const [openPicker, setOpenPicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    
    
    const boxInputProps = {
        className: '',
        inputStyle: 'box',
        placeholder: 'Please Select...'
    };
    
    return (
        <>
                {/* <div className="form-group">
                    <div className="row">
                        <div className="col-12">
                            <Datepicker  controls={['calendar']} select="range" inputProps={boxInputProps} />
                        </div>
                    </div>
                </div> */}
        </>
    ); 
}


