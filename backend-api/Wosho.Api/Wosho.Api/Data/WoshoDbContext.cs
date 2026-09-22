using Microsoft.EntityFrameworkCore;
using System;
using Wosho.Api.Models;

namespace Wosho.Api.Data
{
    public class WoshoDbContext: DbContext
    {
        public WoshoDbContext(DbContextOptions<WoshoDbContext> options)
          : base(options)
        { 
        }
            public DbSet<User> Users
            {
                get; set;
            }

        }
}
