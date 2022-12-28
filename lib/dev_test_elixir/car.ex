defmodule DevTestElixir.Car do
  @moduledoc """
  The Car context
  """

  alias HTTPoison

  @base_url "https://dev-test-frontend-werpwe2p3q-uc.a.run.app"

  def list_all(make \\ nil) do
    case HTTPoison.get("#{@base_url}/cars#{(if is_nil(make), do: "", else: "?make=#{make}")}") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body, headers: headers}} ->
        data = Jason.decode!(body)
        |> Enum.map(fn
          {"allMakes", all_makes} -> {"allMakes", Enum.map(all_makes, &(%{value: &1, label: &1}))}
          rest -> rest
        end)
        |> Enum.into(%{})

        %{
          data: data,
          token: Enum.into(headers, %{})["your-token"]
        }
      {:ok, %HTTPoison.Response{status_code: status_code}} -> {:error, status_code}
      {:error, _} -> :error
    end
  end

  def get(id, token) do
    headers = [
      {"Accept", "application/json"},
      {"Authorization", token}
    ]

    case HTTPoison.get("#{@base_url}/cars/#{id}", headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> Jason.decode!(body)
      {:ok, %HTTPoison.Response{status_code: status_code}} -> {:error, status_code}
      {:error, _} -> :error
    end
  end
end
