import React from 'react';
import './index.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import chevroncircled from './docs/chevron-circled.svg';
import chevronsmall from './docs/chevron-small.svg'
import filterImage from './icons8-filter-24.png'

export default class ProductList extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[],
            firstIndex:0,
            lastIndex:4,
            isShownMenu:false,
            selectValue:'',
            orginalData:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:3004/data')
        .then(res=>res.json())
        .then(data=>this.setState({data}))
    }

    handleNext = () =>{
        this.setState({
            firstIndex:this.state.firstIndex+4,
            lastIndex:this.state.lastIndex+4
        })
    }

    handlePrevious = () => {
        this.setState({
            firstIndex:this.state.firstIndex-4,
            lastIndex:this.state.lastIndex-4
        })
    }

    handleMouseOver = () => {
        this.setState({
            isShownMenu:true
        })
    }

    handleChange = (e) => {
        this.setState({selectValue:e.target.value,isShownMenu:false})
        this.state.orginalData = this.state.data.filter(item=>{
            if(item.bodyType == e.target.value){
                return item;
            }
        })
    }

    render(){
        const {data,firstIndex,lastIndex,isShownMenu,selectValue,orginalData} = this.state;
        const newData = data.slice(firstIndex,lastIndex)
        const renderData = selectValue ? orginalData : newData;
        return(
            <div>
                 <div >
                    <img onMouseOver={this.handleMouseOver} src={filterImage}></img>
                    {isShownMenu && 
                        <div>
                            <select onChange={this.handleChange} value={selectValue}>
                                <option value="suv">SUV</option>
                                <option value="sedan">Sedan</option>
                                <option value="estate">Estate</option>
                            </select>
                        </div>
                    }
                </div>
                <Router>
                    <div className="container-1">
                        {renderData && renderData.map(item=>(
                            <div className="container-2" >
                                <div style={{textAlign:'left'}}>
                                    <span style={{color:'gray'}}>{item.bodyType}</span>
                                    <div className="modelName">
                                        <span ><strong>{item.modelName}</strong></span>
                                        <span className="modelType" style={{color:'gray'}}>{item.modelType}</span>
                                    </div>
                                </div>
                                    <span ><img className="image" src={item.imageUrl}></img></span>
                                <div>
                                    <span className='learn-span'>
                                        <Link to={`/learn/id:${item.id}`}>LEARN
                                        <img className='link-logo' src={chevronsmall}></img>
                                        </Link>
                                    </span>
                                    <span className='shop-span'>
                                        <Link to={`/shop/id:${item.id}`}>SHOP
                                        <img className='link-logo1' src={chevronsmall}></img>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            
                        ))}
                    </div>
            </Router> 
                        <img className={this.state.lastIndex == data.length ?"logo-none" : "logo"} src={chevroncircled} onClick={this.handleNext}></img>
                        <img className={this.state.firstIndex == 0 ?"logo1-none" : "logo1"} src={chevroncircled} onClick={this.handlePrevious}></img>
            </div>
        )
        }
}