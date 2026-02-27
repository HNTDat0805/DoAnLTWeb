using Microsoft.AspNetCore.SignalR;

namespace Boardgame.hub
{
    public class GameHub : Hub
    {
        protected static Dictionary<string, List<string>> rooms = new();
        protected static Dictionary<string, string> playerRoles = new();

        protected async Task<bool> JoinRoomBase(string roomCode)
        {
            if (!rooms.ContainsKey(roomCode))
                return false;

            if (rooms[roomCode].Count >= 2)
            {
                await Clients.Caller.SendAsync("RoomFull");
                return false;
            }

            rooms[roomCode].Add(Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

            return true;
        }

        protected void CreateRoomBase(string roomCode)
        {
            rooms[roomCode] = new List<string>();
        }
    }
}