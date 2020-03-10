import sys
import youtube_dl

#test link: https://www.youtube.com/watch?v=VZR7QaNzznc

class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        pass

ydl_opts = {'logger': MyLogger()}

with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([sys.argv[1]])

print('done')
sys.stdout.flush()