import React, {Component} from 'react';
import Button from "../../../components/ui/button/Button";
import classes from './ContactData.module.css'
import axios from './../../../axios-order';
import Spinner from "../../../components/ui/spinner/Spinner";
import Input from "../../../components/ui/input/Input";
class ContactData extends Component {

    state={
        name:'',
        email:'',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false,
        ingredients:{},

    };

    orderHandler = (e) => {
        e.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: "Maximilian Shwarzmuller",
                address: {
                    street: "Street 15",
                    zipCode: "4343",
                    country: "Germany"
                },
                email: "danilovic.dd@ggg.com"
            },
            deliveryMethod: "fastest"
        };
        this.setState({loading: true});
        axios.post("/order.json", order).then(
            response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            },
            err => {
                console.log(err.response);
                this.setState({loading: false});
            }
        );

    };



    render() {
        if(this.state.loading){
            return <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                <form>
                    <Input inputtype='input' type='text' name='name' placeholder='Your name' label='Your name:'/>
                    <Input inputtype='input' type='email' name='email' placeholder='Your email' label='Your email:'/>
                    <Input inputtype='input' type='text' name='address' placeholder='Your address' label='Your address:'/>
                    <Input inputtype='input' type='text' name='street' placeholder='Your street' label='Your street:'/>
                    <Input inputtype='input' type='text' name='postalCode' placeholder='Your postal code' label='Your postal code:'/>
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;