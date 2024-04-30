<script lang="ts">
  import { onMount } from "svelte";
  let value1:number;
  let value2:number;
  let currency1 = 'USD';
  let currency2 = 'EUR';
  let conversionRate:number;
  let currentActiveInput = '';
  async function fetchConversionRate() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/eda2bdfa7c71739955e02d51/pair/${currency1}/${currency2}`);
    const data = await response.json();
    conversionRate = data.conversion_rate;
    console.log(conversionRate)
  }
  onMount(fetchConversionRate);

  const changeData = () =>{
    if(currentActiveInput==='first'){
      value2 = value1*conversionRate
    }
    if(currentActiveInput==='second'){
      value1 = value2/conversionRate
    }
  }
  const  changeCurrency = async ()=>{
  await fetchConversionRate()
  changeData()
  }
</script>

<main>
  <div class="main">
    <div class ="select_input">
      <select bind:value={currency1} on:change={changeCurrency} class ="select_currency">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
      </select>
      <input type="number" class="input_value" bind:value={value1} on:click ={()=>currentActiveInput='first'} on:input ={changeData}>
    </div>

    <div class ="select_input">
      <select bind:value={currency2} on:change={changeCurrency} class ="select_currency">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
      </select>
      <input type="number" class="input_value" bind:value={value2} on:click ={()=>currentActiveInput='second'} on:input ={changeData}>
    </div>
  </div>
</main>

<style>
  .main{
    display: flex;
  }
  .select_input{
    margin-left: 30px;
    position: relative;
    
  }
  .select_currency{
    position: absolute;
    right: 0;
    border-radius: 14px;
    border: 1px solid rgb(121, 121, 121);
    height: 100%;
    background-color: gray;
    margin-top: 1px;
  }
  .input_value{
    width: 200px;
    border: 1px solid rgb(121, 121, 121);
    border-radius: 14px;
    height: 50px;
    font-size: 30px;
    padding-right: 50px;
    padding-left: 5px;
  }
</style>
