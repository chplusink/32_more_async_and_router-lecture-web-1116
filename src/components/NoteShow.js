import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateNote, deleteNote, updateCurrentNote } from '../actions/'

class NoteShow extends Component {

  handleChange(event){
    //{id: 2, title: 'React', body: 'd' }
    const noteParams = {
      id: this.props.note.id,
      note: {
        body: event.target.value,
        title: this.props.note.title
      }
    }
    this.props.updateNote( noteParams )
    // This method can be responsbile for telling the store that our note has changed...

    // 1. An action creator to Update the Note...
        // That action creator should fire a request to the API to update the note...
    //   2. This component should be able to dispatch that action - we'll do this
    // using mapDispatchToProps
    //  3. Our reducer needs to be able to respond to that action type...
  }

  handleDelete(){
    this.props.deleteNote(this.props.note.id)
  }

  render(){
   this.props.updateCurrentNote(this.props.params.id)
    if ( !this.props.note ) {
      return (<div>Select or Add a Note to get started...</div>)
    }

    return (
      <div>
        <h2>{ this.props.note.title }</h2>
        < input type='text' value={ this.props.note.body } onChange={this.handleChange.bind(this)}/>
        < button onClick={this.handleDelete.bind(this)} >Delete Me</button>
      </div>
    )
  }


}

function mapStateToProps(state, ownProps){
  const note = state.notes.find( note => note.id == state.currentNote )

  return {
    note: note
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateNote: function(noteParams){
      let action = updateNote( noteParams )
      dispatch(action)
    },
    deleteNote: function(noteId){
      let action = deleteNote( noteId )
      dispatch(action)
    },
    updateCurrentNote: function(noteId){
      let action = updateCurrentNote( noteId )
      dispatch( action )
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps)( NoteShow )
