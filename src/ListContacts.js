import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
    static  propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ''
    }
    updateQuery=(query)=>{
        this.setState({query:query.trim()})
    }
    clearQuery=()=>{
        this.setState({query:''})
    }
    render(){
        const {contacts,onDeleteContact}=this.props;
        const {query}=this.state;
        let showingContacts;
        if(query){
            //有检索
            const match=new RegExp(escapeRegExp(query),'i');//忽略大小写
            showingContacts=contacts.filter((contact)=>match.test(contact.name))
        }else{
            //无检索全部输出
            showingContacts=contacts
        }
        showingContacts.sort(sortBy('name'));
        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input type="text" className='search-contacts' placeholder='Search contacts' value={query}
                     onChange={(event)=>this.updateQuery(event.target.value)}/>
                    {/*<Link to='/create' className='add-contact'>Add Contact</Link>*/}
                </div>
                {showingContacts.length!==contacts.length&&(
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map((contact)=>(
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage:`url(${contact.avatarURL})`
                            }} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={()=>onDeleteContact(contact)} className='contact-remove'>Remove</button>
                        </li>
                    ))

                    }
                </ol>
            </div>
        )
    }
}
export default ListContacts;