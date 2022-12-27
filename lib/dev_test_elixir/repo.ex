defmodule DevTestElixir.Repo do
  use Ecto.Repo,
    otp_app: :dev_test_elixir,
    adapter: Ecto.Adapters.Postgres
end
