import './styles.css';
import { useState, useEffect } from 'react';
import Exchange from "../../assets/exchange.svg";
import { Chart } from '../chart/chart';
import axios from 'axios';

function getCurrencySymbol(currencyCode) {
    switch (currencyCode) {
        case 'BRL':
            return 'R$';
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'GBP':
            return '£';
        default:
            return '';
    }
}

export default function Conversor() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BRL');
    const [result, setResult] = useState(0);

    const convertCurrency = async () => {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const exchangeRate = response.data.rates[toCurrency];
        setResult(amount * exchangeRate);
    };

    useEffect(() => {
        convertCurrency();
    }, [fromCurrency, toCurrency, amount]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleExchangeClick = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    function handleSwapCurrencies() {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    const fromCurrencySymbol = getCurrencySymbol(fromCurrency);
    const toCurrencySymbol = getCurrencySymbol(toCurrency);

    return (
        <main>
            <section className="conversor">
                <h2>Conversor de moedas</h2>
                <div className="wrapper">
                    <div className="money-wrapper">
                        <input
                            type="text"
                            className="amount"
                            value={`${amount}`}
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
                            value={`${toCurrencySymbol} ${result}`}
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