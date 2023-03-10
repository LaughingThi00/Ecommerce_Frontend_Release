import React, {useState} from 'react'
import '../css/detail.css';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import closeSearch from '../icon-font/close-icon.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import product from './SearchData';

const CompareForm = styled.div`
    background-color: #fff;
    box-shadow: 1px 1px 1px 1px #ccc;
    border-radius: 20px;
    padding-bottom: 10px;
    height: 100%;
    width: 50%;   
    padding: 16px 16px 16px 16px;
    gap: 16px;
`;

const InputForm = styled.div`
    padding: 0px;
    gap: 9.7px;
    max-width: 100%;
    display: inline;
    flex-direction: column;
    align-items: flex-end;
    input {
        box-sizing: border-box;
        align-items: flex-start;
        width: 100%;
        height: 50px;
        border: 1px solid rgba(36, 89, 173, 1);
        border-radius: 10px;
        &:focus {
            outline: 2px solid rgba(36, 89, 173, 1);
        }
    }
`
const LabelLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 4.85px;
    height: 24px;
    margin-bottom: 10px;
`;

const LabelSearch = styled.label`
    
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 0px;
`;

const SearchResults = styled.div`
    width: 100%;
    height: 210px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    overflow-y: auto;
    
`;

const ProductItem = styled(Link)`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &:hover {
        background-color: lightgrey;
      }
    img {
        max-width:100%;
        max-height:100%;
    }
`;

    

/*const LeftIframe = styled(Iframe)`
    border: none;
    &::-webkit-scrollbar {
        display: none;
      }
`;*/

/*const SearchButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    gap: 10px;
    width: auto;
    height: 40px;
    background: #307FE2;
    border-radius: 8px;
    border: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    cursor: pointer;
`; */



function Compare({open, onClose, handle}) {

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState(""); 
    const [hideInfo, setHideInfo] = useState(true);
    const [showCompare, setShowCompare] = useState(false)

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = product.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };

    const [robot, setRobot] = useState([])

    const appear = (value) => {
        handle()
        setShowCompare(current => true);
        setRobot(value)
    }
    
    const turnBack = () => {
        onClose()
        setShowCompare(current => false)
    }

    const handleBuy = ()=>{
        let cart=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) :[];
        if(!cart.find(item=>item.product.name===robot.name)) cart=[...cart,{product:robot, num:1}]
        else cart.find(item=>item.product.name===robot.name).num++;
        localStorage.setItem('cart',JSON.stringify(cart))
        toast("B???n ???? th??m v??o gi??? h??ng th??nh c??ng!")
        window.dispatchEvent(new Event("storage"));
    
      }

    return (
        <>
            {open && <CompareForm >
                <InputForm shouldCloseOnOverlayClick={false}>
                    <LabelLine>
                        <LabelSearch>Nh???p t??n s???n ph???m</LabelSearch>
                        <img onClick={onClose} src={closeSearch} className="close-outline-btn" alt=""/>
                    </LabelLine>
                        <input 
                            type="text" 
                            value={wordEntered}
                            placeholder="Robot..."
                            onChange={handleFilter}
                        />
                        {filteredData.length !== 0 && (
                            <SearchResults>
                                {filteredData.slice(0, 17).map((value, index) => {                        
                                    return (
                                        <ProductItem key={index} onClick={() => appear(value)}> 
                                            <img src={value.image} alt="" />
                                            <p>{value.name}</p>
                                        </ProductItem>
                                    )
                                })}
                            </SearchResults>
    
                            )}
                </InputForm>               
            </CompareForm>}    
            {showCompare && <div className="detail-container product3">
                <div className="center">
                <img src={robot.image} alt="" />
                {/* <img src={require("../detail_img/2.png")} style={{ width: "100%" }} alt="" /> */}
                </div>
                <div className="under">
                <div className="price">
                    <ion-icon className="price-tag-icon" name="pricetags-outline" />
                    <div className="price-text">Gi?? b??n</div>
                    <div className="price-self">{robot.priceOn}</div>
                </div>
                <div className="more">
                    <ion-icon name="heart-circle-outline" className="heart-btn" />
                    <ion-icon name="share-social-outline" className="share-btn" />
                </div>
                </div>
                <form action="" className="style-form">
                M??u s???c
                <input type="radio" name="form-detail" defaultValue="den" />
                <label>??en</label>
                <input type="radio" name="form-detail" defaultValue="xam" />
                <label>X??m</label>
                </form>
                <div className="name-product">{robot.name}</div>
                <div className="btn-group">
                <button className="btn-shopping" onClick={handleBuy}><ion-icon name="cart-outline" class="shopping-cart"></ion-icon>Mua ngay</button>
                <button className="btn-close-outline"><ion-icon onClick={turnBack} name="close" class="close-outline-pop"></ion-icon></button>
                </div>
                <div className="product-describe">
                Th??ng tin m?? t???
                <ul>
                    <p>{robot.title}</p>
                    {
                        robot.describe.map((line,index) =>
                        <li key={index}>{line}</li>
                        )
                    }
                </ul> 
                </div>
                <div className="more-detail">
                <div className="detail">Th??ng tin chi ti???t</div>
                <div className="hide" onClick={() => setHideInfo(!hideInfo)}>
                    {hideInfo===true? "???n b???t" : "Xem th??m"}
                    {hideInfo===true? <ion-icon name="chevron-up-outline" /> : <ion-icon name="chevron-down-outline" />}
                </div>
                </div>
                {hideInfo && <div className="detail-product">
                <div className="detail-product-item">
                    <div className="field">H???n b???o h??nh:</div>
                    <div className="desc">12 th??ng</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">K??ch th?????c:</div>
                    <div className="desc">340 x 85 x 340 mm</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">Xu???t x???:</div>
                    <div className="desc">Trung Qu???c</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">Dung t??ch ch???a b???i:</div>
                    <div className="desc">200 ml</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">Kh???i l?????ng:</div>
                    <div className="desc">3 kg</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">Dung l?????ng pin:</div>
                    <div className="desc">3400mAh</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">L???c h??t:</div>
                    <div className="desc">5W (~4200pa)</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">M??u s???c:</div>
                    <div className="desc">??en, X??m</div>
                </div>
                <div className="detail-product-item">
                    <div className="field">T??nh n??ng:</div>
                    <div className="desc">
                    ??i???u khi???n qua ???ng d???ng , T??? ?????ng quay v??? ????? s???c , T??? ?????ng ??i???u ch???nh
                    s???c h??t
                    </div>
                </div>
                <div className="detail-product-item">
                    <div className="field">Ti???n ??ch:</div>
                    <div className="desc">
                    H???p ch???a b???i EZ - d??? d??ng v??? sinh v???i n?????cL??n l???ch l??m vi???c v?? theo d??i
                    th??ng qua app k???t n???i v???i ??i???n tho???i th??ng minh
                    </div>
                </div>
                </div>}
            </div>}          
        </>
    )
}


export default Compare