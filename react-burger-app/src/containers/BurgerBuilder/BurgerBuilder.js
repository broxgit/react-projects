import React, {useState, useEffect} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = function(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                // returns the quantity of each ingredient
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                // reduce flattens the array into a single value, here we are calculating the sum of all the ingredient quantities
                return sum + el;
            }, 0);
        // if sum of ingredients is greater than 0, purchasable is true
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
      setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };

    // addIngredientHandler = (type) => {
    //     const oldCount = props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = props.price;
    //     const newPrice = oldPrice + priceAddition;
    //
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     const oldCount = props.ings[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = props.price;
    //     const newPrice = oldPrice - priceDeduction;
    //
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //
    //     this.updatePurchaseState(updatedIngredients);
    // };

        const disabledInfo = {
            ...props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded! </p> : <Spinner />;

        if (props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        price={props.price}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}/>
                </Auxiliary>
            );
        }

        if (props.ings) {
            orderSummary = (
                <OrderSummary
                    ingredients={props.ings}
                    purchaseCanceled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={props.price}
                />
            );
        }
        return (
            <Auxiliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));