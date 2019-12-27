import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';


const TagListWizard2 = ({ onCancel, formValues, submitTagList, history, getWholeListOfTagsHandler, wholeListOfTags }) => {

    useEffect(() => {

        let videoKeys = Object.keys(formValues);
        let videoCounter = 0;
        let videoIdList= _.map(formValues, (video) => {
            if (video) {
                videoCounter++;
                return videoKeys[videoCounter];
            }
            else return ''
        })
        videoIdList.pop();
        videoIdList = videoIdList.filter((videoId) => {return videoId !== '' && videoId !== undefined})
        videoIdList = videoIdList.join('+').toString(); 
        getWholeListOfTagsHandler(videoIdList)
    }, [formValues]);


    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <div className='flow-text' style={{fontSize: '4rem'}}>"{formValues[name]}"</div>
            </div>
        );
    })

    const form_buttons = () => {
        return(
            <div className='row'>
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m1 l3 offset-l2'>
                    <button style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} className="soft-inner black-text darken-3 right" onClick={ onCancel }>
                        Back
                    </button>
                </div>
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m3 l3 offset-l2'>
                    <button style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} onClick={() => getWholeListOfTagsHandler(formValues['title'])} className="soft-inner right black-text">
                        Next
                        <i className="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
        )
    }

    const tagLister = (wholeListOfTags) => {
        const listOfTags = _.map(wholeListOfTags, ({channelTitle, tags}) => {
            return `${channelTitle}, ${tags.join(', ')}`
        })
        return listOfTags.join(', ')
    }
  

    return (
        <div className='container'>
            <h5 className='col s12 m6 offset-m3 l4 offset-l4'>Based on your title</h5>
            <div>
                <div>
                    {reviewFields}
                </div>
            </div>
            <h5 style={{fontWeight: '800'}}>Choose the tags most relevant to yours.</h5>
            
            <form className='row'>

                <p className="flow-text">{tagLister(wholeListOfTags)}</p>
                <div className='container'>{form_buttons()}</div>
            </form>
            
        </div>
    );
};


function mapStateToProps(state) {
    return {
        formValues: state.form.tagListWizard.values
    };
}
// we are using withRouter to redirect
export default connect(mapStateToProps, actions)(withRouter(TagListWizard2));