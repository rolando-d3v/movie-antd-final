import React from 'react'
import {Spin } from "antd"
import "./Loading.scss"

export default function Loading() {
    return (
        <div className="loading" >
            <Spin size="large"   /> {' '}
            <h3 style={{paddingLeft: "20px"}}  >Cargando...</h3>
        </div>
    )
}
