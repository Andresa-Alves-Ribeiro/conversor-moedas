import './styles.css';
import { useState } from 'react';
import Exchange from "../../assets/exchange.svg";
import { Chart } from '../chart/chart';

export default function Conversor() {
    const [amount, setAmount] = useState("$1.00");
    const [fromCurrency, setFromCurrency] = useState("US");
    const [toCurrency, setToCurrency] = useState("BR");
    const [currencySymbol, setCurrencySymbol] = useState("R$");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    const handleExchangeClick = () => {
        const from = fromCurrency;
        const to = toCurrency;
    
        setFromCurrency(to);
        setToCurrency(from);
    
        const numericValue = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
        let newNumericValue = numericValue;
    
        if (from === 'USD') {
            newNumericValue = numericValue * 0.19;
        } else if (from === 'EUR') {
            newNumericValue = numericValue * 6.164;
        } else if (from === 'GBP') {
            newNumericValue = numericValue * 7.119;
        }
    
        if (to === 'USD') {
            newNumericValue /= 5.17;
        } else if (to === 'EUR') {
            newNumericValue /= 6.164;
        } else if (to === 'GBP') {
            newNumericValue /= 7.119;
        }
    
        const newAmount = newNumericValue.toLocaleString('pt-br', { style: 'currency', currency: to === 'BR' ? 'BRL' : 'USD' });
        setAmount(newAmount);

        setCurrencySymbol(to !== 'BR' ? 'R$' : 'US$');
    };
    

    return (
        <main>
            <section className="conversor">
                <h2>Conversor de moedas</h2>
                <div className="wrapper">
                    <div className="money-wrapper">
                        <input
                            type="text"
                            className="amount"
                            value={amount}
                            onChange={handleAmountChange}
                        />

                        <div className="dropdown">
                            <div className="selected">
                                <span className={`fi fi-${fromCurrency.toLowerCase()} fis`}></span>
                                {fromCurrency}
                            </div>

                            <ul>
                                <li>
                                    <span className="fi fi-br fis"></span>
                                    BRL
                                </li>
                                <li>
                                    <span className="fi fi-us fis"></span>
                                    USD
                                </li>
                                <li>
                                    <span className="fi fi-eu fis"></span>
                                    EUR
                                </li>
                                <li>
                                    <span className="fi fi-gb fis"></span>
                                    GBP
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className="middle" onClick={handleExchangeClick}>
                        <img src={Exchange} alt="trocar moeda" />
                    </button>

                    <div className="money-wrapper">
                        <input
                            readOnly
                            type="text"
                            className="amount"
                            value={`${currencySymbol} ${5.17 * parseFloat(amount.replace(/[^0-9.-]+/g, ""))}`}
                        />

                        <div className="dropdown">
                            <div className="selected">
                                <span className={`fi fi-${toCurrency.toLowerCase()} fis`}></span>
                                {toCurrency}
                            </div>

                            <ul>
                                <li>
                                    <span className="fi fi-br fis"></span>
                                    BRL
                                </li>
                                <li>
                                    <span className="fi fi-us fis"></span>
                                    USD
                                </li>
                                <li>
                                    <span className="fi fi-eu fis"></span>
                                    EUR
                                </li>
                                <li>
                                    <span className="fi fi-gb fis"></span>
                                    GBP
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cambio">
                <h2>Taxa de câmbio</h2>
                <div className="wrapper">
                    <div className="chart">
                        <Chart />
                    </div>
                </div>
            </section>
        </main>
    );
}