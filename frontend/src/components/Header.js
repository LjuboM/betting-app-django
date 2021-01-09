import React, { Component } from 'react';
import { ExportableContext } from './providers/MyProvider';

class Header extends Component {
    render() { 
        return (
        <ExportableContext>
            {(value) => (
                <div id="header">
                    <p><b>Betting App</b></p>
                    <p> {value.state.User.name} | {value.state.User.money} HRK</p>
                </div>
            )}
        </ExportableContext>
        )
    }
}
 
export default Header;
