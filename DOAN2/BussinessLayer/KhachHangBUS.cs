﻿using BussinessLayer.Interfaces;
using DataAccessLayer.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public partial class KhachHangBUS : IKhachHangBUS
    {
        private IKhachHangResponsitory _res;
        public KhachHangBUS(IKhachHangResponsitory res)
        {
            _res = res;
        }

        public bool Create(KhachHangModel model)
        {
            return _res.Create(model);
        }

        public bool Update(KhachHangModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(int id )
        {
            return _res.Delete(id);
        }

        public List<KhachHangModel> GetDataAll()
        {
            return _res.GetDataAll();
        }

        public List<KhachHangModel> Search(int pageIndex, int pageSize, out long total, string tenkh, string diachi)
        {
            return _res.Search(pageIndex, pageSize, out total, tenkh, diachi);
        }
    }
}
