import React from 'react';
import { Button } from '../../components/LoadMore/LoadMore';
import './Checkout.scss';
import cn from 'classnames';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';
import { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

interface CountryOption {
  value: string;
  label: string;
  code: string;
}

export const Checkout = () => {
  const { addedProducts, setAddedProducts, quantities, setIsPaymentDone, setMyCartCounter } = useContext(ProductsContext);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [phoneCode, setPhoneCode] = useState<string>('');
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [isTermsCondition, setIsTermsCondition] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPrivacyNotice, setIsPrivacyNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const countryOptions: CountryOption[] = [
    { value: 'us', label: 'United States', code: '+1' },
    { value: 'ca', label: 'Canada', code: '+1' },
    { value: 'gb', label: 'United Kingdom', code: '+44' },
    { value: 'tr', label: 'Turkey', code: '+90' },
    { value: 'au', label: 'Australia', code: '+61' },
    { value: 'in', label: 'India', code: '+91' },
    { value: 'jp', label: 'Japan', code: '+81' },
    { value: 'br', label: 'Brazil', code: '+55' },
    { value: 'de', label: 'Germany', code: '+49' },
  ];

  const countryChangeHandler = (selectedOption: CountryOption | null) => {
    setSelectedCountry(selectedOption);
    setPhoneCode(selectedOption?.code || '');
  };

  const termsOff = !isTermsCondition || !isPrivacyNotice;
  const doneIsOff = !name || !surName || !selectedCountry || !phoneCode || !personalId || termsOff;

  const onTermsConditionHandler = () => {
    setIsTermsCondition((prev) => !prev);
  };

  const onPrivacyNoticeHandler = () => {
    setIsPrivacyNotice((prev) => !prev);
  };

  const getQuantity = (productIndex: number) => {
    return quantities[productIndex] || 1;
  };

  const deliveryPrice = 9.95;

  const totalValue = addedProducts.reduce((total, product, i) => total + Number(product.price) * getQuantity(i), 0).toFixed(
    2
  )
  const discountRate = 10

  const discountedTotal = (discountRate * Number(totalValue)) / 100

  const overAllPrice = (Number(totalValue) - discountedTotal).toFixed(2)

  const totalOverAllPrice = (Number(overAllPrice) - deliveryPrice).toFixed(2)

  const navigate = useNavigate()

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsButtonDisabled(true)

    setTimeout(() => {
      setIsPaymentDone(true)
      setIsLoading(false)
      setIsButtonDisabled(false)
    }, 2300);

    setTimeout(() => {
      setIsPaymentDone(false)
      setAddedProducts([])
      setMyCartCounter(0)
      navigate('/woman')
    }, 5000);
  }

  return (
    <>
      <div className="container page-container payment">
        <h1 className="product-payment-title">Payment</h1>

        <div className="payment-form-container">
          <div className="payment-form">
            <h2 className="form-title">My information</h2>
            <form onSubmit={onSubmitHandler}>
              <p className="form-email">Email</p>
              <p className="form-email-address">kareemashkar97@hotmail.com</p>

              <div className="personalname-container">
                <label autoCorrect="false" className="form-label">
                  Name *
                  <input
                    autoComplete="off"
                    className="form-input"
                    value={name}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const alphaOnly = inputValue.replace(/[^a-zA-Z]/g, '');
                      setName(alphaOnly);
                    }}
                  />
                </label>

                <label className="form-label">
                  Surname *
                  <input
                    autoComplete="off"
                    className="form-input"
                    value={surName}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const alphaOnly = inputValue.replace(/[^a-zA-Z]/g, '');
                      setSurName(alphaOnly);
                    }}
                  />
                </label>
              </div>

              <div className="personalname-container">
                <label className="form-label">
                  Personal Identity
                  <input
                    autoComplete="off"
                    className="form-input"
                    value={personalId}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const numericOnly = inputValue.replace(/\D/g, '');
                      setPersonalId(numericOnly);
                    }}
                  />
                </label>
              </div>

              <div className="personalname-container">
                <label className="form-label">
                  Date of birth *
                  <input
                    autoComplete="off"
                    type="date"
                    className="form-input"
                    min="1910-01-01"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </label>
              </div>

              <div className="personalname-container">
                <label className="form-label">
                  Phone number *
                  <Select
                    value={selectedCountry}
                    onChange={countryChangeHandler}
                    options={countryOptions}
                  />
                  <input
                    autoComplete="off"
                    type="tel"
                    className="form-input"
                    value={phoneCode}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const numericOnly = inputValue.replace(/\D/g, '');
                      setPhoneCode(numericOnly);
                    }}
                  />
                </label>
              </div>

              <div className="personalname-container">
                <label className="form-label">
                  <input autoComplete="off" type="checkbox" />
                  Yes, I want to subscribe to Fashion News, Elegant's{' '}
                  <u style={{ cursor: 'pointer' }}>Privacy Notice</u> I agree to allow the
                  processing of my personal data so that it can send me personalized
                  marketing material. I confirm that I am 18 years of age or over.
                </label>
              </div>

              {isButtonDisabled
                ? (
                  <Button
                    classname="Button done disabled"
                    onClick={() => { }}
                    text="Done"
                    disabled={true}
                    isLoading={isLoading}
                    type="submit"
                  />
                )
                : (
                  <Button
                    classname={cn('Button done', { disabled: doneIsOff })}
                    onClick={() => { }}
                    text="Done"
                    disabled={doneIsOff ? true : false}
                    isLoading={isLoading}
                    type="submit"
                  />
                )
              }
            </form>
          </div>

          <div className="payment-sidebar">
            <div className="orderprice-container">
              <p className="form-orderprice">Order price</p>
              <p className="form-orderprice-value">
                ${totalValue}
              </p>
            </div>

            <div className="orderprice-container">
              <p className="form-orderprice">Discount 10%</p>
              <p className="form-orderprice-value">
                ${overAllPrice}
              </p>
            </div>

            <div className="orderprice-container">
              <p className="form-orderprice">delivery</p>
              <p className="form-orderprice-value">
                ${deliveryPrice}
              </p>
            </div>

            <div className="orderprice-container">
              <p className="form-totalprice">Total</p>
              {addedProducts.length > 0 && (
                <p className="form-totalprice-value">
                  ${totalOverAllPrice}
                </p>
              )}
            </div>

            <div className="conditions-container">
              <label className="conditions-label">
                <input
                  className="conditions-checkbox"
                  type="checkbox"
                  onChange={onTermsConditionHandler}
                  checked={isTermsCondition}
                />
                continuing <u>Elegant's General Terms and Conditions</u> you accept.
              </label>

              <label className="conditions-label">
                <input
                  className="conditions-checkbox"
                  type="checkbox"
                  onChange={onPrivacyNoticeHandler}
                  checked={isPrivacyNotice}
                />
                Elegant's personal data <u>Privacy Notice</u> We will process it in
                accordance with.
              </label>
            </div>

            <div className="orderprice-container">
              <p className="form-totalprice">Customer service</p>
            </div>
            <p className="customerservice-text">
              Need help? <u>See our customer service pages</u> or contact us.
            </p>
          </div>
        </div>
      </div>

      <div className="loader-wrapper">
        <ClipLoader color="#222222" size={50} />
      </div>
    </>
  );
};