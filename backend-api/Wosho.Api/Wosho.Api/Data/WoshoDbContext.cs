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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasIndex(u=> u.EmailAddress)
                .IsUnique();


            modelBuilder.Entity<User>()
                .HasIndex(u=>u.MobileNumber)
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.CreatedAt)
                 .HasColumnType("timestamp with time zone");

            modelBuilder.Entity<User>()
                .Property(u => u.UpdatedAt)
                .HasColumnType("timestamp with time zone");
        }

        }
}
