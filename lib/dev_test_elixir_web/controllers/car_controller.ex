defmodule DevTestElixirWeb.CarController do
  use DevTestElixirWeb, :controller

  alias DevTestElixir.Car
  alias HTTPoison

  def index(conn, %{"make" => make}), do: Car.list_all(make) |> handle_response(conn)
  def index(conn, _params), do: Car.list_all() |> handle_response(conn)

  def show(conn, %{"id" => id, "token" => token}), do: Car.get(id, token) |> handle_response(conn)

  defp handle_response(:error, conn), do: send_resp(conn, 500, "Internal server error.")
  defp handle_response({:error, status_code}, conn), do: conn |> put_status(status_code) |> send_resp
  defp handle_response(data, conn), do: json(conn, data)
end
