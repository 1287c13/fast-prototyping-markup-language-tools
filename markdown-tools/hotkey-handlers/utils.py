import time


def sleep(f):
  def wrapped(*args, **kwargs):
    f(*args, **kwargs)
    time.sleep(0.1)
  return wrapped
