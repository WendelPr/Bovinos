using Microsoft.EntityFrameworkCore;
using BovinosApi;

namespace BovinosApi;

public class VacaDbContext : DbContext
{
    public VacaDbContext(DbContextOptions<VacaDbContext> options) : base(options) { }

    public DbSet<Vaca> Vacas => Set<Vaca>();
}