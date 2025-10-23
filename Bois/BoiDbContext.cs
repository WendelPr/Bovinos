using Microsoft.EntityFrameworkCore;
using BovinosApi;

namespace BovinosApi;

public class BoiDbContext : DbContext
{
    public BoiDbContext(DbContextOptions<BoiDbContext> options) : base(options) { }

    public DbSet<Boi> Bois => Set<Boi>();
}