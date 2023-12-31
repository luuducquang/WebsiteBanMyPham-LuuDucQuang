﻿using BussinessLayer;
using BussinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_MYPHAM.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private IHoaDonBUS _hoaDonBUS;

        public HoaDonController(IHoaDonBUS hoaDonBUS)
        {
            _hoaDonBUS = hoaDonBUS;
        }

        [Route("getbyid-mahoadon-chitiethoadon/{id}")]
        [HttpGet]
        public List<ChiTietHoaDonModelTWO> GetByID(int id)
        {
            return _hoaDonBUS.Getbyids(id);
        }

        [Route("getbytaikhoan-mahoadon-chitiethoadon/{id}")]
        [HttpGet]
        public List<HoaDonModel> Gettaikhoan(int id)
        {
            return _hoaDonBUS.Getbytaikhoan(id);
        }

        [Route("getbytaikhoan-mahoadon-chitiethoadon-product/{id}")]
        [HttpGet]
        public List<HoaDonModel> GettaikhoanProduct(int id)
        {
            return _hoaDonBUS.GetbytaikhoanProduct(id);
        }

        [Route("create-hoadon")]
        [HttpPost]
        public HoaDonModel CreateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Create(model);
            return model;
        }

        [Route("update-hoadon")]
        [HttpPut]
        public HoaDonModel UpdateHoaDon([FromBody] HoaDonModel model)
        {
            _hoaDonBUS.Update(model);
            return model;
        }
    }
}
