return (
  <>
  <div className="login">
  <button onClick={()=>setForm(!form)} className="start_btn">
    get started
  </button>
  <input type="text" style={ { padding:'0rem' } } onChange={namehandler} value={name} name="name"  />
  <button style={{backgroundColor:'blue', color:'white',fontSize:'1.4rem',
  padding:'.5rem 1.3rem' , border:'.1rem solid blue',margin:'0 2rem'}} onClick={change}>submit</button>
   <h1 style={{color:'black',fontSize:'2rem',marginTop:'5rem'}}> {`your name is ${user} `} </h1>
  {
    form &&
    <div className="form_container">
      <span className='close_btn' onClick={()=>{setForm(!form); setOtp([...otp.map(v=>'')])}}> &#10005;</span>
{   !isSubmitting  &&
      <span onClick={()=>{ setIsSubmitting(true); setOtp([...otp.map(v=>'')]) }} className="back" >  &larr;</span>}

      <h1 className='heading'>Take the first step, to fulfill your study abroad dreams</h1>
      <img className='login_img' src={Login} alt="" />
      {/* <form action="" className="otp_form">
        <div className="input_layer" style={number.length===10?{ border:'.01rem solid green' , 
        boxShadow:'0 0 0 .rem green'}:{border:'none'}}>
          <span className='sign' style={!isSubmitting ? {color : '#7a7a7a'}:{color:'black'}}>+91</span>
        <input disabled={!isSubmitting && true} style={!isSubmitting ? {color : '#7a7a7a'}:{color:'black'}} maxLength={'10'} 
        type="text" 
        name = "mobile"
                   
                    value={number.text}
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                    autocomplete="off" />
        </div> */}
        {/* <p className='error'>please type a number only</p> */}
        <form onSubmit={handleSubmit} className="otp_form">
        <div className="input_layer" style={number.length===10?{ border:'.01rem solid green' , 
        boxShadow:'0 0 0 .rem green'}:{border:'none'}}>
          
            <div id="recaptcha-container"></div>
                <span className='sign' style={!isSubmitting ? {color : '#7a7a7a'}:{color:'black'}}>+91</span>
                    <input  type="text"
                    disabled={!isSubmitting && true} style={!isSubmitting? {color : '#7a7a7a'}:{color:'black'}} maxLength={'10'} 
                    value={number} onChange={handler}
                    name = "mobile"
                    className="form-control"
                    value={values.text}
                    placeholder="Enter mobile number"
                    onChange={handleChange}
                    autocomplete="off"
                    />
                </div>
                
        {isSubmitting && 
          <Button ref={submitBtn} onClick={handleSubmit} className="btn1"variant="primary" type="submit" 
          >Get OTP</Button>}
{errors.mobile && (
<p className="help is-danger">{errors.mobile}</p>
)}

      </form>


      <input type="text" style={ { padding:'0rem' } } onChange={namehandler} value={name} name="name"  />
      <button style={{backgroundColor:'blue', color:'white',fontSize:'1.4rem',
      padding:'.5rem 1.3rem' , border:'.1rem solid blue',margin:'0 2rem'}} onClick={change}>submit</button>
       <h1 style={{color:'black',fontSize:'2rem',marginTop:'5rem'}}> {`your name is ${user} `} </h1>