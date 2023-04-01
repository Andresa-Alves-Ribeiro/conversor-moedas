import './styles.scss';
import { useState, useEffect } from 'react';
import Exchange from "../../assets/exchange.svg";
import { Chart } from '../chart/chart';
import axios from 'axios';


export default function Conversor() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('BRL');
    const [flagFromCurrency, setFlagFromCurrency] = useState('US');
    const [flagToCurrency, setFlagToCurrency] = useState('BR')
    const [result, setResult] = useState(0);


    function getCurrencySymbol(currency) {
        let symbol = '';
        switch (currency) {
            case 'BRL':
                symbol = 'R$';
                break;
            case 'USD':
                symbol = '$';
                break;
            case 'EUR':
                symbol = '€';
                break;
            case 'GBP':
                symbol = '£';
                break;
            case 'JPY':
                symbol = '¥'
                break
            case 'CAD':
                symbol = '$'
                break
            case 'AUD':
                symbol = '$'
                break
            case 'CNY':
                symbol = '¥'
                break
            case 'CHF':
                symbol = 'CHF'
                break
            default:
                symbol = '';
                break;
        }
        return symbol;
    }

    const convertCurrency = async () => {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const exchangeRate = response.data.rates[toCurrency];
        setResult(amount * exchangeRate);
    };

    useEffect(() => {
        convertCurrency();
    }, [fromCurrency, toCurrency, amount]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value.replace(/\D/g, ''));
    };

    const handleExchangeClick = () => {
        setFromCurrency(toCurrency);
        setFlagFromCurrency(flagToCurrency);
        setToCurrency(fromCurrency);
        setFlagToCurrency(flagFromCurrency);
    };

    const fromCurrencySymbol = getCurrencySymbol(fromCurrency);
    const toCurrencySymbol = getCurrencySymbol(toCurrency);

    function handleCurrencySelect(currency) {
        setFromCurrency(currency);
        setFlagFromCurrency(currency.substring(0, 2));
        setToCurrency(toCurrency === currency ? fromCurrency : toCurrency);
        setFlagToCurrency(toCurrency === currency ? flagFromCurrency : flagToCurrency);
    }

    function handleCurrencySelect2(currency) {
        setToCurrency(currency);
        setFlagToCurrency(currency.substring(0, 2));
    }

    return (
        <main>
            <section className="conversor">
                <h2>Conversor de moedas</h2>
                <div className="wrapper">
                    <div className="money-wrapper">
                        <input
                            type="text"
                            className="amount"
                            value={`${fromCurrencySymbol} ${amount}`}
                            onChange={handleAmountChange}
                        />

                        <div className="dropdown">
                            <div className="selected">
                                <span className={`fi fi-${flagFromCurrency.toLowerCase()} fis`}></span>
                                {fromCurrency}
                            </div>

                            <ul>
                                <li onClick={() => handleCurrencySelect("BRL")}>
                                    <span className="fi fi-br fis"></span>
                                    BRL
                                </li>
                                <li onClick={() => handleCurrencySelect("USD")}>
                                    <span className="fi fi-us fis"></span>
                                    USD
                                </li>
                                <li onClick={() => handleCurrencySelect("EUR")}>
                                    <span className="fi fi-eu fis"></span>
                                    EUR
                                </li>
                                <li onClick={() => handleCurrencySelect("GBP")}>
                                    <span className="fi fi-gb fis"></span>
                                    GBP
                                </li>
                                <li onClick={() => handleCurrencySelect("JPY")}>
                                    <span className="fi fi-jp fis"></span>
                                    JPY
                                </li>
                                <li onClick={() => handleCurrencySelect("CAD")}>
                                    <span className="fi fi-ca fis"></span>
                                    CAD
                                </li>
                                <li onClick={() => handleCurrencySelect("AUD")}>
                                    <span className="fi fi-au fis"></span>
                                    AUD
                                </li>
                                <li onClick={() => handleCurrencySelect("CNY")}>
                                    <span className="fi fi-cn fis"></span>
                                    CNY
                                </li>
                                <li onClick={() => handleCurrencySelect("CHF")}>
                                    <span className="fi fi-ch fis"></span>
                                    CHF
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
                            value={`${toCurrencySymbol} ${result.toFixed(2)}`}
                        />

                        <div className="dropdown">
                            <div className="selected">
                                <span className={`fi fi-${flagToCurrency.toLowerCase()} fis`}></span>
                                {toCurrency}
                            </div>

                            <ul className='options'>
                                <li onClick={() => handleCurrencySelect2("BRL")}>
                                    <span className="fi fi-br fis"></span>
                                    BRL
                                </li>
                                <li onClick={() => handleCurrencySelect2("USD")}>
                                    <span className="fi fi-us fis"></span>
                                    USD
                                </li>
                                <li onClick={() => handleCurrencySelect2("EUR")}>
                                    <span className="fi fi-eu fis"></span>
                                    EUR
                                </li>
                                <li onClick={() => handleCurrencySelect2("GBP")}>
                                    <span className="fi fi-gb fis"></span>
                                    GBP
                                </li>
                                <li onClick={() => handleCurrencySelect2("JPY")}>
                                    <span className="fi fi-jp fis"></span>
                                    JPY
                                </li>
                                <li onClick={() => handleCurrencySelect2("CAD")}>
                                    <span className="fi fi-ca fis"></span>
                                    CAD
                                </li>
                                <li onClick={() => handleCurrencySelect2("AUD")}>
                                    <span className="fi fi-au fis"></span>
                                    AUD
                                </li>
                                <li onClick={() => handleCurrencySelect2("CNY")}>
                                    <span className="fi fi-cn fis"></span>
                                    CNY
                                </li>
                                <li onClick={() => handleCurrencySelect2("CHF")}>
                                    <span className="fi fi-ch fis"></span>
                                    CHF
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