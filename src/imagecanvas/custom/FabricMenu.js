import React from "react";
import { getItems, FabricMenuApi} from "./FabricMenuSettings.js"
import FabricSubMenu from './FabricSubMenu.js'

class FabricMenu extends React.Component {
 constructor(props) {
   super(props);

    this.contextRef = React.createRef();
    this.returnMenu = this.returnMenu.bind(this);

    this.state = {
      items: [],
      coords: {
        x: 0,
        y: 0
      },
      style: {
       'position': 'absolute',
       'top': '0px',
       'left':'0px'
      },
      on: false,
      select: 0,
    };
  }

  updateCoords(x, y) {
    if (this.state.coords.x !== x
      && this.state.coords.y !== y) {
      this.setState( prevState => ({
        ...prevState,
        coords: {
          x: x,
          y: y,
        },
        style: {
          ...prevState.style,
          'top': `${y}px`,
          'left':`${x+5}px`
        }
      }))
    }
  }

  updateItems(items) {
    if (this.state.items !== items) {
      this.setState( prevState => ({
        ...prevState,
        items: items
      }))
    }
  }

  updateDisplay(on) {
    if (this.state.on !== on) {
      this.setState( prevState => ({
        ...prevState,
        on: on
      }))
    }
  }
  updateSelect(sel) {
    if (this.state.select !== sel) {
      this.setState( prevState => ({
        ...prevState,
        select: sel
      }))
    }
  }

  returnMenu() {
    FabricMenuApi.subscribe(state => {
      this.updateItems(state.menu.items)
      this.updateCoords(state.menu.coords.x, state.menu.coords.y)
      this.updateDisplay(state.menu.displayon)
      this.updateSelect(state.menu.select)
    })
    if (this.state.on) {
      return (
        <div className='custom-context' id='customcontext' style={this.state.style} ref={this.contextRef}>
        {
          getItems().map((item, index, arr) => {
            if (arr.length > 0) {
              let label = item.label+"-button-wrapper"
              return (
                <div key={label}>
                  <button onClick={item.callback}> {item.label} </button>
                </div>
              )
            }
            return null
          })
        }
        </div>
      )
    }

    if (this.state.select === 1 ) {
      return (
        <FabricSubMenu style={this.state.style}/>
      )
    }
    return (
      null
    )
  }

  render() {
    return (
      <div id='cmenu'>
        {this.returnMenu()}
      </div>
    );
  }
}

export default FabricMenu;