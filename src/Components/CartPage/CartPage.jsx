import React from "react";
import s from "./CartPage.module.css"
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";
import SliderImage from "./SliderImage/SliderImage";
import {NavLink} from "react-router-dom";
import Attributes from "../common/Attributes/Attributes";
import {calculatePrice, findPrice} from "../../redux/funtions";


class CartPage extends React.Component {
    state = {
        total: 0,
        taxAmount: 0,
        currency: ''
    }

    componentDidMount() {
        if (this.props.defaultCurrency) {
            this.setState({
                currency: this.props.currentCurrency ? this.props.currentCurrency : this.props.defaultCurrency,
                total: this.props.currentCurrency ? calculatePrice(this.props.orders, this.props.currentCurrency).total
                    : calculatePrice(this.props.orders, this.props.defaultCurrency).total,
                taxAmount: this.props.currentCurrency ? calculatePrice(this.props.orders, this.props.currentCurrency).tax
                    : calculatePrice(this.props.orders, this.props.defaultCurrency).tax
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( (this.props.currentCurrency && prevProps.currentCurrency) !== this.props.currentCurrency ) {
            this.setState({
                currency: this.props.currentCurrency,
                total: calculatePrice(this.props.orders, this.props.currentCurrency).total,
                taxAmount: calculatePrice(this.props.orders, this.props.currentCurrency).tax
            })
        }
        if (prevProps.numberOrders !== this.props.numberOrders) {
            this.setState({
                total: calculatePrice(this.props.orders, this.props.currentCurrency).total,
                taxAmount: calculatePrice(this.props.orders, this.props.currentCurrency).tax
            })
        }
    }


    render() {

        return (
            <>
                {this.props.defaultCurrency &&
                <div className={s.cartPage}>

                    <h1>CART</h1>
                    {this.props.orders.map((order, key, index) =>
                        <div key={key} className={s.order}>

                            <div className={s.info}>
                                <NavLink to={'/products/' + order.id}>
                                    <h2>{order.name}</h2>
                                </NavLink>
                                <h2 className={s.brand}>{order.brand}</h2>

                                <div className={s.price}>
                                    <p>
                                        {this.state.currency}
                                        {this.state.currency ? findPrice(order.prices, this.state.currency) : null}
                                    </p>
                                </div>

                                {order.attributes.map(attributes =>
                                    <Attributes key={attributes.name} attributes={attributes}
                                                options={order.options} isDisabled={true}/>
                                )}
                            </div>

                            <div className={s.orderPhoto}>
                                <div className={s.changeAmount}>
                                    <input type={'button'} value={'+'}
                                           onClick={() => this.props.increaseQuantity(key)}/>
                                    <input type={'button'} className={s.label} value={order.quantity}/>
                                    <input type={'button'} value={'-'}
                                           onClick={() => this.props.decreaseQuantity(key, index)}/>
                                </div>

                                <div className={s.slider}>
                                    <SliderImage key={key} gallery={order.gallery}/>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={s.totalPrice}>
                        <div className={s.tax}>
                            <h2>Tax 21%:</h2>
                            <h2>Quantity:</h2>
                            <h2>Total:</h2>
                        </div>
                        {this.props.orders.length === 0
                            ? null
                            : <div className={s.sum}>
                                <h2>{this.state.currency}{this.state.taxAmount}</h2>
                                <h2>{this.props.numberOrders}</h2>
                                <h2>{this.state.currency}{this.state.total}</h2>
                            </div>
                        }
                    </div>

                    <button>Order</button>
                </div>
                }
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        defaultCurrency: state.currency.defaultCurrency,
        currentCurrency: state.currency.currentCurrency,
        orders: state.cart.orders,
        numberOrders: state.cart.numberOrders,
    }
}

export default connect(mapStateToProps, {increaseQuantity, decreaseQuantity})
(CartPage);
