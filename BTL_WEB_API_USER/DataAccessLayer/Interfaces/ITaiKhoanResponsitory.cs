﻿using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface ITaiKhoanResponsitory
    {
        List<TaiKhoanModel> Getalltaikhoan();
        List<ChiTietTaiKhoanModelTWO> Getbyids(int MaTaiKhoan);
        bool Create(TaiKhoanModel model);
        bool Update(TaiKhoanModel model);
        bool Doimk(DoimkModel model);

    }
}
