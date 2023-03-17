var vP = 0.1
var i = 0.1
var n = 0.1
var pmt = 0.1
var totalPago = 0.1
var totalJuros = 0.1
var periodo = 1
var debito_inicial = 0
var debito_final = 0

const calcular = () => {
    document.getElementById('formulario').classList.add('d-none')
    periodo = 1
    document.getElementById('tabela').classList.add('d-none')
    pega_valores()
    // a ultima coisa 
    console.log(pmt);
}

const pega_valores = () =>{
  vP = parseFloat(document.getElementById('valorPresente').value)
  i = parseFloat(document.getElementById('taxaJuros').value)
  n = parseFloat(document.getElementById('numeroParcelas').value)
  if (isNaN(vP)){
    limpar()
  }else if (isNaN(i)){
    limpar()
  }else if (isNaN(n)){
    limpar()
  }else if (vP<1){
    limpar()
  }else if (1<1){
    limpar()
  }else if (n<1){
    limpar()
  }else{
    i/=100
    financiarPrice()
    calculaTotalPagoPrice()
    calculaTotalJurosPrice()
    preencherTabela()
  }
}

const formatarValor =(valor) =>{
  var valor = valor
  valor =parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  return String(valor)
}
limpaTabela = () =>{
  const rows = document.querySelectorAll('#tabela>tbody tr')
  const rows2 = document.querySelectorAll('#tabela>tfoot tr')
  rows.forEach(row => row.parentNode.removeChild(row))
  rows2.forEach(row => row.parentNode.removeChild(row))
}
preencherTabela = () =>{
  limpaTabela()
  debito_inicial = vP
  for (var i=0; i<(n);i++) {
    criarLinha()
  }
  const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <th>Total</th>
    <th >#</th>       
    <th>${formatarValor(totalPago)}</th>
    <th>${formatarValor(totalJuros)}</th>
    <th>${formatarValor(vP)}</th>
    <th >#</th>       
    `
    document.querySelector('#tabela>tfoot').appendChild(newRow)
  document.getElementById('tabela').classList.remove('d-none')
}
criarLinha = () =>{
  var juros_periodo = debito_inicial * i
  var valor_abatido_periodo = pmt - juros_periodo
  debito_final = debito_inicial - valor_abatido_periodo
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
  <th>${periodo}º</th>
  <th>${formatarValor(debito_inicial)}</th>
  <td>${formatarValor(pmt)}</td>
  <td><span class="badge badge-primary badge-pill">${i*100}%</span> ${formatarValor(juros_periodo)} </td>
  <td>${formatarValor(valor_abatido_periodo)}</td>
  <th>${formatarValor(debito_final)}</th>
     
  `
  debito_inicial = debito_final
  periodo +=1
  document.querySelector('#tabela>tbody').appendChild(newRow)
}
formataMascara=(label, valor)=>{
  let formato = { minimumFractionDigits: 2 , style: 'currency', currency: label }
  return valor.toLocaleString('pt-BR', formato)
}

financiarPrice = () =>{
  console.log(vP+" "+i+" "+" "+n);
  /* Aplicamos a fórmula de financiamento com base na tabela PRICE */
  let prestacao = vP * ( Math.pow((1+i),n) * i ) / ( Math.pow((1+i),n) -1 );
  pmt = prestacao;
  return formataMascara('BRL',pmt);
}


calculaTotalPagoPrice = () =>{
    totalPago = pmt * n;
    return formataMascara('BRL',totalPago);
}

calculaTotalJurosPrice = () =>{
  if(totalPago===0){
     total = calculaTotalPagoPrice();
     totalJuros = total - vP;
 }else{
     totalJuros = totalPago - vP;
 }
 return formataMascara('BRL',totalJuros);
}
limpar = () =>{
  document.getElementById('numeroParcelas').value=0
  document.getElementById('taxaJuros').value=0
  document.getElementById('valorPresente').value=0

  document.getElementById('formulario').classList.remove('d-none')
  periodo = 1
  document.getElementById('tabela').classList.add('d-none')
}
document.getElementById('calcular')
.addEventListener('click', calcular)


document.getElementById('limpar')
.addEventListener('click', limpar)