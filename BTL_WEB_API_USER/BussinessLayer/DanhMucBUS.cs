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
    public partial class DanhMucBUS : IDanhMucBUS
    {
        private IDanhMucResponsitory _res;
        public DanhMucBUS(IDanhMucResponsitory res)
        {
            _res = res;
        }
        public List<DanhMucModel> GetAllDanhmucs()
        {
            return _res.GetAllDanhmucs();
        }
        public List<DanhMucModel> Search(int pageIndex, int pageSize, out long total, string TenDanhMuc)
        {
            return _res.Search(pageIndex, pageSize, out total, TenDanhMuc);
        }
    }
}
