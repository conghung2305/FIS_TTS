import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import HeaderComponent from "../components/Header";
import MainComponent from "../components/Main";


const List: React.FC = () => {

  return (
    <div className='containerX'>

      <HeaderComponent />

      <MainComponent />
    </div>
  )
}
export default List



