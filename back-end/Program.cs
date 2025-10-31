using BovinosApi;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// SQLite -------------------------------------------------------------------------------------------
builder.Services.AddDbContext<BoiDbContext>(options =>
    options.UseSqlite("Data Source=Bois.db"));

builder.Services.AddDbContext<VacaDbContext>(options =>
    options.UseSqlite("Data Source=Vacas.db"));

// ---------- Habilitar CORS ----------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()    // permite qualquer origem
              .AllowAnyMethod()    // permite GET, POST, PUT, DELETE, etc.
              .AllowAnyHeader();   // permite qualquer header (ex: Content-Type)
    });
});

var app = builder.Build();

// Usar a política de CORS
app.UseCors("AllowAll");

// GETES 


app.MapGet("/filtrar/bois/{status}/{raca}", async (BoiDbContext db, String status , String raca) =>{
    List<Boi> boisBanco = await db.Bois.ToListAsync();  
    List<Boi> boisFiltrados = new List<Boi>();  

    foreach (Boi b in boisBanco){
        
        if(b.Raca.ToLower() == raca.ToLower() && b.Status.ToLower() == status.ToLower()){
            boisFiltrados.Add(b);
        }

    }
    return Results.Ok(boisFiltrados);
});
app.MapGet("/filtrar/vacas/{status}/{raca}", async (VacaDbContext db, String status , String raca) =>{
    List<Vaca> boisBanco = await db.Vacas.ToListAsync();  
    List<Vaca> boisFiltrados = new List<Vaca>();  

    foreach (Vaca b in boisBanco){
        
        if(b.Raca.ToLower() == raca.ToLower() && b.Status.ToLower() == status.ToLower()){
            boisFiltrados.Add(b);
        }

    }
    return Results.Ok(boisFiltrados);
});





app.MapGet("/bois", async (BoiDbContext db) =>
{
    return await db.Bois.ToListAsync();
});

app.MapGet("/vacas", async (VacaDbContext db) =>
{
    return await db.Vacas.ToListAsync();
});

// POSTS -------------------------------------------------------------------------------------------
app.MapPost("/bois", async (BoiDbContext db, Boi novoBoi) =>
{
    db.Bois.Add(novoBoi);
    await db.SaveChangesAsync();
    return Results.Created($"/Bois/{novoBoi.Id}", novoBoi);
});

app.MapPost("/vacas", async (VacaDbContext db, Vaca novaVaca) =>
{
    db.Vacas.Add(novaVaca);
    await db.SaveChangesAsync();
    return Results.Created($"/Vacas/{novaVaca.Id}", novaVaca);
});

// PUTS -------------------------------------------------------------------------------------------
app.MapPut("/bois/{id}", async (int id, BoiDbContext db, Boi boiAtualizado) =>
{
    var boi = await db.Bois.FindAsync(id);
    if (boi is null) return Results.NotFound("Boi não encontrado!");

    boi.Nome = boiAtualizado.Nome;
    boi.DataNascimento = boiAtualizado.DataNascimento;
    boi.Raca = boiAtualizado.Raca;
    boi.Peso = boiAtualizado.Peso;
    boi.Origem = boiAtualizado.Origem;
    boi.Status = boiAtualizado.Status;
    boi.observacoes = boiAtualizado.observacoes;

    await db.SaveChangesAsync();
    return Results.Ok(boi);
});

app.MapPut("/vacas/{id}", async (int id, VacaDbContext db, Vaca vacaAtualizado) =>
{
    var vaca = await db.Vacas.FindAsync(id);
    if (vaca is null) return Results.NotFound("Vaca não encontrado!");

    vaca.Nome = vacaAtualizado.Nome;
    vaca.DataNascimento = vacaAtualizado.DataNascimento;
    vaca.Raca = vacaAtualizado.Raca;
    vaca.Peso = vacaAtualizado.Peso;
    vaca.Origem = vacaAtualizado.Origem;
    vaca.Status = vacaAtualizado.Status;
    vaca.observacoes = vacaAtualizado.observacoes;

    await db.SaveChangesAsync();
    return Results.Ok(vaca);
});

// DELETES -------------------------------------------------------------------------------------------
app.MapDelete("/bois/{id}", async (int id, BoiDbContext db) =>
{
    var boi = await db.Bois.FindAsync(id);
    if (boi is null) return Results.NotFound("Boi não encontrado!");

    db.Bois.Remove(boi);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/vacas/{id}", async (int id, VacaDbContext db) =>
{
    var vaca = await db.Vacas.FindAsync(id);
    if (vaca is null) return Results.NotFound("Vaca não encontrado!");

    db.Vacas.Remove(vaca);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
