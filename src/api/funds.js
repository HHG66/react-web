import request from './index.js'

export const getPositionFundsListApi=(params)=>{
  return request({
    url:"/getpositionfundslist",
    method:'GET',
    params:{
      fundname:params.fundname
    }
  })
}

export const deleteFundApi=(data)=>{
  return request({
    url:'deletefund',
    method:'POST',
    data:{
      fundid:data.id
    }
  })
}

export const editfundinfo=(data)=>{
  return request({
    url:"/editfundinfo",
    method:'POST',
    data:{
      fundid:data.fundid,
      fundstate:data.fundstate,
      sellingnumber:data.sellingnumber||'',
      sellingprice:data.sellingprice||'',
      addnumber:data.addnumber||'',
      price:data.price||'',
    }
  })
}