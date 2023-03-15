import './styles.css'
import Exchange from "../../assets/exchange.svg"
import Graphic from '../chart/chart'


export default function Conversor() {
    return (
        <main>
            <section className="conversor">
                <h2>Conversor de moedas</h2>
                <div className="wrapper">
                    <div className="money-wrapper">
                        <input type="text" className='amount' value="$1.000" />

                        <div className='dropdown'>
                            <div className='selected'>
                                <span className="fi fi-us fis"></span>
                                USD
                            </div>

                            <ul>
                                <li>
                                <span className="fi fi-br fis"></span>
                                BRL</li>
                                <li>
                                <span className="fi fi-us fis"></span>
                                USD</li>
                                <li>
                                <span className="fi fi-eu fis"></span>
                                EUR</li>
                                <li>
                                <span className="fi fi-gb fis"></span>
                                GBP</li>
                            </ul>
                        </div>
                    </div>

                    <div className="middle">
                        <img src={Exchange} alt="trocar moeda" />
                    </div>

                    <div className="money-wrapper">
                        <input readOnly type="text" className='amount' value="R$ 5.148,20" />

                        <div className='dropdown'>
                            <div className='selected'>
                                <span className="fi fi-br fis"></span>
                                BRL
                            </div>

                            <ul>
                                <li>
                                <span className="fi fi-br fis"></span>
                                BRL</li>
                                <li>
                                <span className="fi fi-us fis"></span>
                                USD</li>
                                <li>
                                <span className="fi fi-eu fis"></span>
                                EUR</li>
                                <li>
                                <span className="fi fi-gb fis"></span>
                                GBP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cambio">
                <h2>Taxa de câmbio</h2>
                <div className="wrapper">
                    <div className="chart">
                        <Graphic />
                    </div>
                </div>
            </section>
        </main>
    )
}