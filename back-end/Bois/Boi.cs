namespace BovinosApi;

public class Boi
{
    public int Id { get; set; }
    public string? Nome { get; set; }
    public DateOnly DataNascimento { get; set; }
    public string? Raca { get; set; }
    public int? Peso { get; set;}
    public string? Origem { get; set; }
    public string? Status { get; set;}
    public string? observacoes { get; set;}
}