import { Link } from "react-router-dom";
import CurrencyInput from "./CurrencyInput";
import AllUsersInput from "./AllUsers";
import React,{ useState, useEffect } from "react";
import axios from "axios";

const Editor = () => {

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(2);
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("EUR");
    const [users, setUsers] = useState([]);
    const [rates, setRates] = useState([]);

    const config = {
        headers: {
            'Auth-Token' : localStorage.getItem('token'),
        }
    };

    useEffect(() => {

        axios
          .get(
            "https://api.fastforex.io/fetch-all?api_key=5831c2e287-d91e6b3cdb-r71569"
          )
          .then((response) => {
            setRates(
              {
                "USD" : response.data.results.USD,
                "EUR" : response.data.results.EUR,
                "NGN" : response.data.results.NGN
              }
            )
          });
      }, []);

      useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
      
            const response = await axios.get(`https://simba-challenge-backend.herokuapp.com/api/users`, config, {
                signal: controller.signal
            });

            console.log(response.data)
            isMounted && setUsers({
              Israel : response.data.username,
              Robert : response.data.username,
              itisWasp : response.data.username,
              TestUser : response.data.username
            })
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
        
      }, []);
      
    
      useEffect(() => {
        if(!!rates) {
          handleAmount1Change(amount1);
        }
      }, [rates]);
    
      function format(number) {
        return number.toFixed(4);
      }
    
      function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
      }
    
      function handleCurrency1Change(currency1) {
        // setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
      }
    
      function handleAmount2Change(amount2) {
        // setAmount2(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
      }
    
      function handleCurrency2Change(currency2) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency2(currency2);
      }

      function handleUserChange(user) {
        console.log(user);
      }
    
      return (
        <section>
    
          <h1>Currency Converter</h1>

          <br />

          <h4>From</h4>
    
          <CurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange = {handleCurrency1Change}
            currencies={Object.keys(rates)}
            amount={amount1}
            currency={currency1}
          />

          <br/>

          <h4>To</h4>

    
          <CurrencyInput
            onAmountChange = {handleAmount2Change}
            onCurrencyChange = {handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}
          />

          <h4>Choose a User to send money to</h4>
          <AllUsersInput
              users = {Object.keys(users)}
              onUserChange = {handleUserChange}
          />

            <div className="flexGrow">
            <Link to="/linkpage">
               <button >
                  Send
               </button>
            </Link>
            </div>
    
        </section>
      );

    // return (
    //     <section>
    //         <h1>Editors Page</h1>
    //         <br />
    //         <p>You must have been assigned an Editor role.</p>
    //         <div className="flexGrow">
    //             <Link to="/">Home</Link>
    //         </div>
    //     </section>
    // )
}

export default Editor