import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields-step-1';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';
import { reduxForm } from 'redux-form';
import renderFieldTagListName from './renderFieldTagListName'


let TagListWizard2 = ({ 
        auth,
        onCancel, 
        formValues, 
        listOfChosenTags,
        listOfChosenTagBubbles,
        chooseTagFromListHandler,
        getWholeListOfTagsHandler,
        removeTagFromListHandler, 
        wholeListOfTags, 
        letterCount,
        submitTagList
    }) => {

    useEffect(() => {

        let videoIdList = Object.keys(formValues);
        let videoIdValues = Object.values(formValues);
        let videoIdListLength = videoIdList.length;

        videoIdList.splice(0,1);
        videoIdValues.splice(0,1);



        for(let i=0; i< videoIdListLength; i++){
            if(!videoIdValues[i]){
                videoIdList[i] = '';
            }
        }

        getWholeListOfTagsHandler(videoIdList.filter((videoId) => {return videoId !== ''}).join('+').toString())
        window.scrollTo(0, 0)
    }, [formValues]);

    // useEffect(() => {

    // }, [listOfRemovedTagBubbles])

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

                {auth ?  
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m3 l3 offset-l2'>
                    <button type='button' style={{height:'2rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} onClick={() => {console.log(listOfChosenTags);submitTagList(listOfChosenTags, formValues.title)}} className="soft-inner right black-text">
                        Save
                        <i className="material-icons">save</i>
                    </button>
                </div>
                : 
                <div className='soft-outter btn-wrapper col s5 offset-s1 m4 offset-m3 l3 offset-l2'>
                    <a style={{height:'10rem', display:'flex', alignItems:'center', justifyContent:'space-evenly'}} href='/auth/google' className="soft-inner right black-text">
                        <div className='red darken-4 flex-column' style={{fontSize:'1.25rem',width:'100%', height:'100%', padding:'3px', margin:'2px', borderRadius:'20px',textAlign:'center'}}>
                            Login to Google to save (progress will be lost)
                            <i className="material-icons">save</i>
                        </div>
                    </a>
                </div>
                }

            </div>
        )
    }

    // const tagLister = (wholeListOfTags) => {
    //     const listOfTags = _.map(wholeListOfTags, ({channelTitle, tags}) => {
    //         return `${channelTitle}, ${tags.join(',')}`
    //     });

    //     return listOfTags.join(', ')
    // }

    // const letterCounter = (x) => {
    //     x = x.replace(/\s/g,'aaa')
    //     return x.replace(/[^a-zA-Z]/g, '').length;
    // }


    const tagBubbler = (listOfTags) => {
        const listOfTagBubbles = listOfTags.map(tag => {
            return (
                <div key={tag} className='soft-outter' style={{display:'flex',marginRight:'2px', flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly',borderRadius:'20px', padding:'2px 3px',margin:'1px 2px'}}>
                    <div className='soft-inner' style={{padding:'3px'}}>
                        <div onClick={()=>{chooseTagFromListHandler(tag)}} className='flow-text' style={{padding:'2px',borderRadius:'20px'}}>{tag},</div>
                    </div>
                </div>
            )
        })
        return listOfTagBubbles;

    }

    const chosenTagBubbler = (listOfTags) => {
        let listOfTagBubbles;
                if(listOfTags !== undefined){
                    listOfTagBubbles = listOfTags.map(tag => {
                        return (
                            <div key={tag} onClick={()=> {removeTagFromListHandler(tag)}}className='soft-outter' style={{display:'flex',marginRight:'2px', flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly',borderRadius:'20px', padding:'2px 3px',margin:'1px 2px'}}>
                                <div className='soft-inner' style={{padding:'3px'}}>
                                    <div className='flow-text' style={{padding:'2px',borderRadius:'20px', background:'var(--tagBubble)'}}>{tag},</div>
                                </div>
                            </div>
                        )
                    })
                    
                }
                else listOfTagBubbles = '';
        return listOfTagBubbles;
    }

    
  

    return (
        <div className='container'>
            <div>
                <div>
                    {console.log(listOfChosenTagBubbles)}
                    {renderFieldTagListName()}
                </div>
            </div>   
            <form className='row'>
                <h5 style={{fontWeight:'800'}}>Choose some tags, then copy and paste!</h5>
                <p className="flow-text" style={{fontWeight:'800'}}>Tag-list length: {letterCount}</p>
                <p style={{marginTop:'-1rem'}}>Choose up to 500ish</p>

                <h5 style={{fontFamily:'var(--bitter)'}}>Chosen Tags<i className='material-icons'>arrow_drop_down</i></h5>
                <div style={{display:'flex',flexWrap:'wrap', width:'100%'}} className="flow-text">{listOfChosenTags.length === 0? <span className='red-text'>You haven't picked any tags yet!</span> : chosenTagBubbler(listOfChosenTags)}</div>

                <h5 style={{fontFamily:'var(--bitter)'}}>Choose the tags you like.<i className='material-icons'>arrow_drop_down</i></h5>
                <div style={{display:'flex',flexWrap:'wrap', width:'100%', marginBottom:'1rem'}} className="flow-text">{tagBubbler(wholeListOfTags)}</div>
                
                <div className='container'>{form_buttons()}</div>
            </form>
            
        </div>
    );
};


function mapStateToProps(state) {
    return {
        auth: state.auth,
        formValues: state.form.tagListWizard.values
    };
}

TagListWizard2 = connect(
    mapStateToProps,
    actions
)(TagListWizard2)

// we are using withRouter to redirect
export default reduxForm({
    form: 'tagListWizard',
    destroyOnUnmount: false
})(TagListWizard2);